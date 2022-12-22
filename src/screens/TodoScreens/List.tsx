import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import React, { FC, useCallback, useEffect, useState } from "react"
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
  FlatList,
} from "react-native"
import { shallowEqual } from "react-redux"
import { todoAPI } from "../../api/todo-api"
import Task from "../../components/Task"
import { getTasks, getTodos, setError } from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TasksType } from "../../types/common"
import { TodoStackParamList } from "../../types/navigation-types"
import { deepComparison } from "../../utils/deepComparison"

type ListProps = NativeStackScreenProps<TodoStackParamList, "List">

const List: FC<ListProps> = React.memo(({ navigation, route }) => {
  //const {login, isAuth} = useTypedSelector(state => state.auth)
  const list = route.params.list
  const color = route.params.color

  const id = list.id

  const { colors, dark } = useMyTheme()
  const tabBarHeight = useBottomTabBarHeight()
  const [tasks, setTasks] = useState<any>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [initialized, setInitialized] = useState<boolean>(false)

  const tasksD = useTypedSelector(
    (state) => state.todo.todoData.find((todolist) => todolist.id === id),
    deepComparison
  )

  const dispatch = useAppDispatch()

  console.log("DIXBROUD")

  useEffect(() => {
    // fetchTasks()
    dispatch(getTasks(id))
    //? This timeout func makes screen open without list items rendering delay
    //? so if you delete this timer, there are will be delay before navigating here
    setTimeout(() => {
      setInitialized(true)
    }, 1)
    //*
    navigation.setOptions({
      title: list.title,
      headerLargeTitleStyle: {
        color: color,
      },
      headerTintColor: color,
      headerRight: () => (
        <Button title="Edit" color={color} onPress={menuHandler} />
      ),
      // headerTintColor: list.color
    })
  }, [])

  const deleteList = () => {
    todoAPI.todolistDelete(list.id).then(() => {
      dispatch(getTodos()).then(() => {
        navigation.goBack()
      })
    })
  }

  const menuHandler = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: `Edit "${list.title}"`,
          options: ["Cancel", "Delete list"],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          userInterfaceStyle: dark ? "dark" : "light",
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            console.log("cancel")
          } else {
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
        }
      )
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
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {tasksD?.tasks && initialized && tasksD.tasks.length > 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: tabBarHeight,
              backgroundColor: colors.background,
              width: "100%",
            }}
          >
            <View>{/* <Text>{tasksD.tasks.length}</Text> */}</View>
            <View style={{ width: "100%" }}>
              {tasksD.tasks.map((t, index) => (
                <Task
                  task={t}
                  btnColor={color}
                  colors={colors}
                  key={t.id}
                  index={index + 1}
                />
              ))}
            </View>
          </View>
        ) : (
          <>
            {!tasksD?.tasks || !initialized ? (
              <View style={{ marginTop: 12 }}>
                <ActivityIndicator />
              </View>
            ) : (
              <View>
                <Text style={{ color: colors.disabledText }}>
                  タスクがありません
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
})

const styles = StyleSheet.create({})

export default List
