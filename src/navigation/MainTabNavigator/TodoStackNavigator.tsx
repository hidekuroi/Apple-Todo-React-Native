import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Platform } from "react-native"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Todos from "../../screens/TodoScreens/Todos"
import { TodoStackParamList } from "../../types/navigation-types"
import { useLocale } from "../../hooks/useLocale"

const TodoStackNavigator = () => {
  const TodoStack = createNativeStackNavigator<TodoStackParamList>()

  const { login } = useTypedSelector((state) => state.auth)
  const i18n = useLocale()
  const { colors } = useMyTheme()

  return (
    <TodoStack.Navigator
      initialRouteName="Todos"
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerBlurEffect: "systemMaterial",
        headerBackTitle: "Back",
      }}
    >
      <TodoStack.Screen
        name="Todos"
        component={Todos}
        options={{
          title: login,
          // headerSearchBarOptions: {
          //   placeholder: i18n.t('searchPlaceholder'),
          //   cancelButtonText: i18n.t('cancel'),
          //   hideWhenScrolling: true,
          //   obscureBackground: true,
          // },
        }}
      />

      {/* <TodoStack.Screen
        name="List"
        component={List}
        options={{
          presentation: "card",
          headerLargeStyle: { backgroundColor: colors.background },
        }}
      /> */}
    </TodoStack.Navigator>
  )
}

export default TodoStackNavigator
