import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Platform } from "react-native"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import CreateNewListModal from "../../screens/TodoScreens/CreateNewListModal"
import List from "../../screens/TodoScreens/List"
import Todos from "../../screens/TodoScreens/Todos"
import { TodoStackParamList } from "../../types/navigation-types"

const TodoStackNavigator = () => {
  const TodoStack = createNativeStackNavigator<TodoStackParamList>()

  const { login } = useTypedSelector((state) => state.auth)
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
          headerSearchBarOptions: {
            hideNavigationBar: true,
            placeholder: "Search",
            hideWhenScrolling: true,
            obscureBackground: true,
          },
        }}
      />

      <TodoStack.Screen
        name="CreateNewListModal"
        component={CreateNewListModal}
        options={{
          title: "New todolist",
          presentation: "modal",
          headerLargeTitle: false,
          headerLargeStyle: { backgroundColor: colors.modalBackground },
          // gestureEnabled: false,
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
