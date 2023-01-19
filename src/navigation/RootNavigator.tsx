import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Platform } from "react-native"
import { useMyTheme } from "../hooks/useMyTheme"
import { useTypedSelector } from "../hooks/useTypedSelector"
import Auth from "../screens/Auth"
import MainTabNavigator from "./MainTabNavigator/MainTabNavigator"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { RootStackParamList } from "../types/navigation-types"
import { initializeApp } from "../features/appstate/appstate-slice"
import Loading from "../screens/Loading"
import List from "../screens/TodoScreens/List"

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>()

  const { isAuth } = useTypedSelector((state) => state.auth)
  const { isInitialized } = useTypedSelector((state) => state.appstate)
  const dispatch = useAppDispatch()
  const { colors } = useMyTheme()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <RootStack.Navigator initialRouteName="Auth">
      {isAuth && isInitialized ? (
        <RootStack.Group>
          <RootStack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <RootStack.Screen
            name="List"
            component={List}
            options={{
              headerLargeTitle: true,
              headerLargeStyle: { backgroundColor: colors.background },
              headerTransparent: Platform.OS === "ios" ? true : false,
              headerBlurEffect: "systemMaterial",
            }}
          />
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          {isInitialized ? (
            <RootStack.Screen
              name="Auth"
              component={Auth}
              options={{
                headerLargeTitle: true,
                headerLargeStyle: { backgroundColor: colors.background },
                headerStyle: { backgroundColor: colors.card },
                headerTransparent: Platform.OS === "ios" ? true : false,
                headerBlurEffect: "systemMaterial",
                /*
                ! lol idk why, but when the MainTabNavigator animation is set to "fade" and this
                ! animation to "push" all stuff works fine but when it's "pop" - fade animation is used....
                */
                animationTypeForReplace: "push",
              }}
            />
          ) : (
            <RootStack.Screen
              name="Loading"
              component={Loading}
              options={{
                headerShown: false,
              }}
            />
          )}
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  )
}

export default RootNavigator
