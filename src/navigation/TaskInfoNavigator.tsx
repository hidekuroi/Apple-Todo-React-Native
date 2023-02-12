import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useMyTheme } from "../hooks/useMyTheme"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import {
  TaskInfoParamList,
} from "../types/navigation-types"
import { initializeApp } from "../features/appstate/appstate-slice"
import TaskInfo from "../screens/TaskInfo"
import TaskDetails from "../screens/NewTaskModalScreens/TaskDetails"
import { Platform } from "react-native"
import SelectList from "../screens/NewTaskModalScreens/SelectList"
import { useLocale } from "../hooks/useLocale"

const TaskInfoNavigator = ({ navigation, route }) => {
  const TaskInfoStack = createNativeStackNavigator<TaskInfoParamList>()
  const routeProps = route.params
  console.log(routeProps)
  const dispatch = useAppDispatch()
  const i18n = useLocale()
  const { colors, dark } = useMyTheme()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <TaskInfoStack.Navigator
      initialRouteName="TaskInfo"
      screenOptions={{
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerBlurEffect: "systemMaterial",
        headerShown: true,
        title: "New task",
        headerLargeTitle: false,
        headerLargeStyle: { backgroundColor: colors.modalBackground },
      }}
    >
      <TaskInfoStack.Screen
        name="TaskInfo"
        component={TaskInfo}
        initialParams={{task: routeProps?.task}}
      />
      <TaskInfoStack.Screen name="TaskDetails" options={{headerBackTitle: i18n.locale === 'ru' ? i18n.t('back') : i18n.t('titleNewtask')}} component={TaskDetails} />
      <TaskInfoStack.Screen name="SelectList" options={{headerLargeStyle : {backgroundColor: dark ? colors.modalBackground : colors.modalCard}}} component={SelectList} />
    </TaskInfoStack.Navigator>
  )
}

export default TaskInfoNavigator
