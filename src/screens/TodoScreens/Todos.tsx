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
} from "react-native"
import { shallowEqual } from "react-redux"
import TodolistItem from "../../components/TodolistItem"
import { getSettings } from "../../features/settings/settings-slice"
import { getTodos } from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TasksType, TodoType } from "../../types/common"
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

  const cloudSettings = useTypedSelector((state) => {return state.settings.cloud.settings})
  const localSettings = useTypedSelector((state) => state.settings.local)

  const isSettingsInitialized = useTypedSelector((state) => {return state.settings.cloud.isLoaded})

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

  const listNavigate = (list: TodoType, color = colors.text, settings: any) => {
    navigation.navigate("List", { list, color, settings: {iconNameValue: settings.iconNameValue, colorValue: settings.colorValue} })
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
        {/* <Button title='refresh' onPress={onRefresh} /> */}
        {todoData?.length && isSettingsInitialized ? <View style={[styles.list, { backgroundColor: colors.card }]}>
          <>
          {console.log('REAL RENDER')}
          {
          todoData?.map((list: TodoType, index: number) => {
            //@ts-ignore
            let listSettings: any = []
            cloudSettings.map((s: TasksType) => {
              if(s.title === list.id) {
                let temp = s.description.split(';')
                temp.map((i) => {
                  const splitted = i.split('=')
                  listSettings[splitted[0]] = splitted[1]
                })
              }
            })
            return <View key={list.id} style={{display: list.title === 'SETTINGS' ? (localSettings.isSettingsListVisible ? 'flex' : 'none') : 'flex'}}>
              <TodolistItem
                text={list.title}
                helperText={list.totalCount?.toString()}
                handlePress={(color: string) => listNavigate(list, color, {iconNameValue: listSettings?.iconName, colorValue: listSettings?.accentColor})}
                isLast={index + 1 !== todoData.length}
                accentColor={listSettings?.accentColor}
                iconName={listSettings?.iconName}
                isSquare={localSettings.isSquareIcons}
              />
            </View>
        })}</>
        </View>  : <ActivityIndicator style={{flex: 1,justifyContent: 'center', alignItems: 'center'}} />}
        
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
