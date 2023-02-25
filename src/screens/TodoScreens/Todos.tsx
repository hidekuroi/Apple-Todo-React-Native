import { Ionicons } from "@expo/vector-icons"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useHeaderHeight } from "@react-navigation/elements"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import React, { FC, useCallback, useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Button,
  Text,
  TouchableHighlight,
  SectionList,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from "react-native"
import { shallowEqual } from "react-redux"
import Card from "../../components/Card"
import Task from "../../components/Task"
import TodolistItem from "../../components/TodolistItem"
import { getSettings } from "../../features/settings/settings-slice"
import { getTodos } from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useLocale } from "../../hooks/useLocale"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TasksType, TodoType } from "../../types/common"
import { TodoStackParamList } from "../../types/navigation-types"
import { deepComparison } from "../../utils/deepComparison"

type TodosScreenProps = NativeStackScreenProps<TodoStackParamList, "Todos">
type listDataType =
  | {
      title: string
      data: Array<TasksType>
      id: string
      accentColor: string
    }
  | undefined

const Todos: FC<TodosScreenProps> = React.memo(({ navigation }) => {
  const dispatch = useAppDispatch()

  const { colors } = useMyTheme()
  const i18n = useLocale()
  const bottomBarHeight = useBottomTabBarHeight()
  const headerHeight = useHeaderHeight()

  const [showResult, setShowResult] = useState<boolean>(false)
  const [result, setResult] = useState<any>({})

  const todoData = useTypedSelector((state) => {
    return state.todo.todoData
  }, shallowEqual)

  const cloudSettings = useTypedSelector((state) => {
    return state.settings.cloud.settings
  })

  let listData: listDataType[] = []

  

  // const totalCount = useTypedSelector(state => state.todo.totalCount)
  const isTodolistsFetching = useTypedSelector((state) => {
    return state.todo.isTodolistsFetching
  })

  const isSettingsListVisible = useTypedSelector(
    (state) => state.settings.local.isSettingsListVisible
  )
  const isSquareIcons = useTypedSelector(
    (state) => state.settings.local.isSquareIcons
  )

  const isSettingsInitialized = useTypedSelector((state) => {
    return state.settings.cloud.isLoaded
  })

  console.log("TODOS RENDERED")

  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(
    () => {
      getLists()

      navigation.setOptions({
        headerRight: () => (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateNewListModal", {})}
            >
              <Ionicons name="add" color={colors.primary} size={32} />
            </TouchableOpacity>
          </View>
        ),
        // headerSearchBarOptions: {onChangeText: setSearchValue}
      })
    },
    [
      //? for themes with different primary color
      // colors
    ]
  )

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: i18n.t("searchPlaceholder"),
        cancelButtonText: i18n.t("cancel"),
        hideWhenScrolling: true,
        // obscureBackground: true,
        onChangeText: (e) => handleSearch(e.nativeEvent.text),
        // onBlur: () => console.log('blur'),
        // onClose: () => console.log('close')
      },
    })
  }, [todoData])

  const handleSearch = (text: string) => {
    if (text) {
      const regexp = new RegExp(text, 'gi')
      let result: listDataType[] = []

      todoData &&
      todoData.map((list) => {
      let listSettings: any = []
      cloudSettings.map((s: TasksType) => {
        if (s.title === list.id) {
          let temp = s.description.split(";")
          temp.map((i) => {
            const splitted = i.split("=")
            listSettings[splitted[0]] = splitted[1]
          })
        }
      })

      let tasks: TasksType[] = []

      list.tasks &&
      (tasks = list.tasks.filter(task => {
        return (regexp.test(task.title) || regexp.test(task.description))}))

        tasks.length && result.push({
          title: list.title,
          data: tasks,
          id: list.id,
          accentColor: listSettings?.accentColor,
        })
    })

      setResult(result)

      setShowResult(true)
    } else {
      setShowResult(false)
    }
  }

  useEffect(() => {
    if (!isTodolistsFetching && refreshing) setRefreshing(false)
  }, [isTodolistsFetching])

  const getLists = async () => {
    dispatch(getTodos())
  }

  const newTaskHandler = () => {
    navigation.navigate("TaskInfoNavigator")
  }

  const listNavigate = (list: TodoType, color = colors.text, settings: any) => {
    navigation.navigate("List", {
      list,
      color,
      settings: {
        iconNameValue: settings.iconNameValue,
        colorValue: settings.colorValue,
      },
    })
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(getSettings()).then(() => {
      getLists()
    })
  }, [])

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={[
            styles.wrapper,
            { marginTop: 0, marginBottom: bottomBarHeight * 2 },
          ]}
        >
          {Platform.OS === "web" && (
            <View style={{ marginVertical: 12 }}>
              <Button title="refresh" onPress={onRefresh} />
            </View>
          )}
          {/* 
        //! Automatize all this stuff to calculate automaticly in Card component
        //? It's temporary button in any case :/
        */}
          <View
            style={{
              width: "100%",
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                marginLeft: Platform.OS === "ios" ? "4.25%" : "0%",
              }}
            >
              <Card noMargin>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableHighlight
                    onPress={newTaskHandler}
                    style={{ flexDirection: "row", borderRadius: 11 }}
                    underlayColor={colors.touching}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 12,
                        height: "100%",
                        alignItems: "center",
                        paddingVertical: 14,
                        width: "100%",
                      }}
                    >
                      <Ionicons
                        name="add-circle"
                        size={30}
                        color={colors.primary}
                      />
                      <Text
                        style={{
                          color: colors.primary,
                          marginLeft: 10,
                          fontSize: 17,
                        }}
                      >
                        {i18n.t("newTask")}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </Card>
            </View>
          </View>

          {todoData?.length && isSettingsInitialized ? (
            <View style={[styles.list, { backgroundColor: colors.card }]}>
              <>
                {console.log("REAL RENDER")}
                {todoData?.map((list: TodoType, index: number) => {
                  //@ts-ignore
                  let listSettings: any = []
                  cloudSettings.map((s: TasksType) => {
                    if (s.title === list.id) {
                      let temp = s.description.split(";")
                      temp.map((i) => {
                        const splitted = i.split("=")
                        listSettings[splitted[0]] = splitted[1]
                      })
                    }
                  })
                  return (
                    <View
                      key={list.id}
                      style={{
                        display:
                          list.title === "SETTINGS"
                            ? isSettingsListVisible
                              ? "flex"
                              : "none"
                            : "flex",
                      }}
                    >
                      <TodolistItem
                        text={list.title}
                        helperText={list.totalCount?.toString()}
                        handlePress={(color: string) => {
                          listNavigate(list, color, {
                            iconNameValue: listSettings?.iconName,
                            colorValue: listSettings?.accentColor,
                          })
                        }}
                        isLast={index + 1 !== todoData.length}
                        accentColor={listSettings?.accentColor}
                        iconName={listSettings?.iconName}
                        isSquare={isSquareIcons}
                        chevron
                      />
                    </View>
                  )
                })}
              </>
            </View>
          ) : (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
        </View>

        <StatusBar style="auto" />
      </ScrollView>
      {showResult && result && (
        <KeyboardAvoidingView
          style={{
            position: "absolute",
            backgroundColor: colors.background,
            display: "flex",
            height: Dimensions.get("window").height - bottomBarHeight,
            width: Dimensions.get("window").width,
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <SectionList
             keyboardShouldPersistTaps={'always'}
              style={{ marginTop: headerHeight + 5, 
                // height: Dimensions.get("window").height - bottomBarHeight - headerHeight,
                // paddingBottom: bottomBarHeight
               }}
              sections={result}
              // disableVirtualization
              // keyExtractor={(item, index) => item + index}
              renderItem={({ section, item, index }) => (
                <View style={{ paddingLeft: "1.75%" }}>
                  <Task
                    task={item}
                    btnColor={section.accentColor}
                    taskInfoHandler={(task: TasksType) => {
                      navigation.navigate("TaskInfoNavigator", { task })
                      Keyboard.dismiss()
                    }}
                    colors={colors}
                    index={index}
                    listId={item.todoListId}
                  />
                </View>
              )}
              ListHeaderComponent={() => (
                <Text
                  style={{
                    fontSize: 24,
                    color: colors.helperText,
                    paddingHorizontal: "4.25%",
                  }}
                >
                  Some info
                </Text>
              )}
              renderSectionHeader={({ section }) => (
                <View
                  style={{
                    backgroundColor: colors.background,
                    paddingVertical: 7,
                    borderTopWidth: 0.5,
                    borderTopColor: colors.divider,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 24,
                      color: section.accentColor,
                      paddingHorizontal: "4.25%",
                    }}
                  >
                    {section.title}
                  </Text>
                </View>
              )}
              stickyHeaderIndices={[0]}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  list: {
    width: Platform.OS === "ios" ? "91.5%" : "100%",
    borderRadius: 11,
  },
})

export default Todos
