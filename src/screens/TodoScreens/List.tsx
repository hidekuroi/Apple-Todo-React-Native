import { useHeaderHeight } from "@react-navigation/elements"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BlurView } from "expo-blur"
import { StatusBar } from "expo-status-bar"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Platform,
  Button,
  ActionSheetIOS,
  Alert,
  Animated,
  LayoutRectangle,
  Dimensions,
} from "react-native"
import { todoAPI } from "../../api/todo-api"
import BottomToolbar from "../../components/BottomToolbar"
import Task from "../../components/Task"
import {
  deleteTodolist,
  getTasks,
  getTodos,
  setError,
} from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { RootStackParamList } from "../../types/navigation-types"
import { deepComparison } from "../../utils/deepComparison"

const { height } = Dimensions.get("screen")

type ListProps = NativeStackScreenProps<RootStackParamList, "List">

const List: FC<ListProps> = React.memo(({ navigation, route }) => {
  const list = route.params.list
  const color = route.params.color
  const settings = route.params.settings
  console.log("settings: ", settings)

  const test = useTypedSelector((state) =>
    state.settings.cloud.settings.find((setting) => setting.title === list.id)
  )
  
  let settings2: any = {}
  let temp = test?.description.split(";")
  temp?.map((i) => {
    const splitted = i.split("=")
    settings2[splitted[0]] = splitted[1]
  })

  console.log("test: ", settings2)

  const id = list.id

  const { colors, dark } = useMyTheme()
  // const tabBarHeight = useBottomTabBarHeight()
  const barHeight = useHeaderHeight()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const scrollingY = useRef(new Animated.Value(0)).current
  const [listEnd, setListEnd] = useState<LayoutRectangle | null>(null)

  const topEdge = listEnd && listEnd.y - height + listEnd.height

  const [initialized, setInitialized] = useState<boolean>(true)

  const [newTaskAmount, setNewTaskAmount] = useState<Array<number>>([])

  //?STARTING POINT

  const tasksD = useTypedSelector(
    (state) => state.todo.todoData.find((todolist) => todolist.id === id),
    deepComparison
  )

  const dispatch = useAppDispatch()

  console.log("DIXBROUD")

  useEffect(() => {
    dispatch(getTasks(id))
    //? This timeout func makes screen open without list items rendering delay
    //? so if you delete this timer, there are will be delay before navigating here
    // setTimeout(() => {
    //   setInitialized(true)
    // }, 1)
    //*
    // navigation.setOptions({
    //   title: list.title,
    //   headerLargeTitleStyle: {
    //     color: settings2.accentColor,
    //   },
    //   headerTintColor: color,
    //   headerRight: () => (
    //     <Button title="Edit" color={color} onPress={menuHandler} />
    //   ),
    // })
  }, [])

  useEffect(() => {
    navigation.setOptions ({
      title: tasksD?.title,
      headerLargeTitleStyle: {
        color: settings2.accentColor,
      },
      headerTintColor: settings2.accentColor,
      headerRight: () => (
        <Button title="Edit" color={settings2.accentColor} onPress={menuHandler} />
      ),
    })
    console.log('changed')
  }, [settings2.accentColor, tasksD?.title])

  const deleteList = () => {
    dispatch(deleteTodolist(list.id)).then(() => {
      navigation.goBack()
    })
  }

  const addNewTask = () => {
    if (newTaskAmount.length) {
      console.log(newTaskAmount)
      const arr = newTaskAmount
      arr.push(arr[arr.length - 1] - 1)
      setNewTaskAmount([...arr])
    } else setNewTaskAmount([0])
  }

  const menuHandler = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: `Edit "${tasksD?.title}"`,
          options: ["Cancel", "Edit", "Delete list"],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
          userInterfaceStyle: dark ? "dark" : "light",
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            console.log("cancel")
          } else if (buttonIndex === 2) {
            Alert.alert(
              `Delete "${list.title}"`,
              "Are you sure you want to delete this list?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: deleteList },
              ],
              { userInterfaceStyle: dark ? "dark" : "light" }
            )
          } else {
            navigation.navigate("CreateNewListModal", {
              colorValue: settings2.accentColor,
              iconNameValue: settings2.iconName,
              title: tasksD?.title,
              todolistId: list.id,
            })
          }
        }
      )
    } else if (Platform.OS === "android") {
      Alert.alert(
        `Delete "${list.title}"`,
        "Are you sure you want to delete this list?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: deleteList },
        ],
        { userInterfaceStyle: dark ? "dark" : "light" }
      )
    }

    //! delete later
    else if (Platform.OS === "web") {
      // if(confirm('Are you sure you want to delete this list?')) {
      // deleteList()
      navigation.navigate("CreateNewListModal", {
        colorValue: settings2.accentColor,
        iconNameValue: settings2.iconName,
        title: tasksD?.title,
        todolistId: list.id,
      })
      // }
    }
  }

  const onRefresh = useCallback(() => {
    //! Make isFetching work
    setRefreshing(true)
    dispatch(getTasks(id)).then(() => {
      setRefreshing(false)
    })
  }, [])

  return (
    <View style={{ height: "100%" }}>
      <Animated.ScrollView
        contentInsetAdjustmentBehavior="automatic"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollingY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {(tasksD?.tasks && initialized && tasksD.tasks.length > 0) ||
          (newTaskAmount.length > 0 && initialized) ? (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.background,
                  width: "100%",
                }}
              >
                {/* <Task isCreatingTask={true} listId={tasksD.id} colors={colors} index={0} btnColor={color} /> */}
                {tasksD &&
                  newTaskAmount &&
                  newTaskAmount
                    .slice(0)
                    .reverse()
                    .map((nt: number) => {
                      return (
                        <Task
                          key={nt}
                          isCreatingTask={true}
                          listId={tasksD.id}
                          colors={colors}
                          index={nt}
                          btnColor={settings2.accentColor}
                        />
                      )
                    })}
                {tasksD?.tasks &&
                  tasksD.tasks.map((t, index) => (
                    <Task
                      task={t}
                      btnColor={settings2.accentColor}
                      colors={colors}
                      key={t.id}
                      index={index + 1}
                      listId={tasksD.id}
                    />
                  ))}

                {/* //?Layout block to start interpolation */}
                <View
                  onLayout={(e) => {
                    setListEnd(e.nativeEvent.layout)
                  }}
                  style={{
                    width: "100%",
                    height: barHeight / 1.5,
                    //  backgroundColor: 'blue'
                  }}
                />
              </View>
              {/* //?/ */}
            </View>
          ) : (
            <>
              {!tasksD?.tasks || !initialized ? (
                <View style={{ marginTop: 12 }}>
                  <ActivityIndicator />
                </View>
              ) : (
                !newTaskAmount.length && (
                  <View>
                    <Text style={{ color: colors.disabledText }}>
                      タスクがありません
                    </Text>
                  </View>
                )
              )}
            </>
          )}
        </View>
      </Animated.ScrollView>

      <BottomToolbar
        onBtnTouch={() => addNewTask()}
        scrollingY={scrollingY}
        topEdge={topEdge}
        accentColor={settings2.accentColor}
        tasksLength={tasksD?.tasks?.length}
      />

      <StatusBar style="auto" />
    </View>
  )
})

const styles = StyleSheet.create({})

export default List
