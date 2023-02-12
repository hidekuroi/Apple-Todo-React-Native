import { Ionicons } from "@expo/vector-icons"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
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
} from "react-native"
import { shallowEqual } from "react-redux"
import Card from "../../components/Card"
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

const Todos: FC<TodosScreenProps> = React.memo(({ navigation }) => {
  const dispatch = useAppDispatch()

  const { colors } = useMyTheme()
  const i18n = useLocale()
  const bottomBarHeight = useBottomTabBarHeight()

  const todoData = useTypedSelector((state) => {
    return state.todo.todoData
  }, shallowEqual)

  // const totalCount = useTypedSelector(state => state.todo.totalCount)
  const isTodolistsFetching = useTypedSelector((state) => {
    return state.todo.isTodolistsFetching
  })

  const cloudSettings = useTypedSelector((state) => {
    return state.settings.cloud.settings
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
      })
    },
    [
      //? for themes with different primary color
      // colors
    ]
  )

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
          <View style={{marginVertical: 12}}><Button title="refresh" onPress={onRefresh} /></View>
        )}
        {/* 
        //! Automatize all this stuff to calculate automaticly in Card component
        //? It's temporary button in any case :/
        */}
        <View style={{width: '100%', marginBottom: 12, flexDirection: 'row', justifyContent: 'flex-start'}}>
        
        <View style={{width: '50%', justifyContent: 'center', marginLeft: Platform.OS === 'ios' ? '4.25%' : '0%'}}>
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
                style={{flexDirection: "row", borderRadius: 11}}
                underlayColor={colors.touching}
              >
                <View style={{
                  flexDirection: "row",
                  paddingHorizontal: 12,
                  height: "100%",
                  alignItems: "center",
                  paddingVertical: 14,
                  width: "100%",

                }}>
                <Ionicons name="add-circle" size={30} color={colors.primary} />
                <Text
                  style={{
                    color: colors.primary,
                    marginLeft: 10,
                    fontSize: 17,
                  }}
                >
                  {i18n.t('newTask')}
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
                      handlePress={(color: string) =>
                        listNavigate(list, color, {
                          iconNameValue: listSettings?.iconName,
                          colorValue: listSettings?.accentColor,
                        })
                      }
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
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
