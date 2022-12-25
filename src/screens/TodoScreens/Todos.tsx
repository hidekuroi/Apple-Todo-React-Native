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
} from "react-native"
import { shallowEqual } from "react-redux"
import TodolistItem from "../../components/TodolistItem"
import { getTodos } from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TodoType } from "../../types/common"
import { TodoStackParamList } from "../../types/navigation-types"
import { deepComparison } from "../../utils/deepComparison"

type TodosScreenProps = NativeStackScreenProps<TodoStackParamList, "Todos">

const Todos: FC<TodosScreenProps> = React.memo(({ navigation }) => {
  const dispatch = useAppDispatch()

  const { colors } = useMyTheme()
  const bottomBarHeight = useBottomTabBarHeight()

  const todoData = useTypedSelector((state) => {
    return state.todo.todoData
  }, shallowEqual)

  // const totalCount = useTypedSelector(state => state.todo.totalCount)
  const isTodolistsFetching = useTypedSelector((state) => {
    return state.todo.isTodolistsFetching
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
              onPress={() => navigation.navigate("CreateNewListModal")}
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

  const listNavigate = (list: TodoType, color = colors.text) => {
    navigation.navigate("List", { list, color })
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    getLists()
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
        {/* <Button title='refresh' onPress={onRefresh} /> */}
        <View style={[styles.list, { backgroundColor: colors.card }]}>
          {todoData?.map((list: TodoType, index: number) => (
            <View key={list.id}>
              <TodolistItem
                text={list.title}
                helperText={list.totalCount?.toString()}
                handlePress={(color: string) => listNavigate(list, color)}
                isLast={index + 1 !== todoData.length}
              />
            </View>
          ))}
        </View>
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
