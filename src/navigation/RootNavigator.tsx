import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { useMyTheme } from "../hooks/useMyTheme";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Auth from "../screens/Auth";
import MainTabNavigator from "./MainTabNavigator/MainTabNavigator";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authCheck } from "../features/auth/auth-slice";
import { RootStackParamList } from "../types/navigation-types";

const RootNavigator = () => {

  const RootStack = createNativeStackNavigator<RootStackParamList>();

  const { isAuth } = useTypedSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const { colors } = useMyTheme()

  useEffect(() => {
    dispatch(authCheck())
  }, [])

  return(
      <RootStack.Navigator initialRouteName='Auth'>
        {isAuth ? (
        <RootStack.Group>
          <RootStack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{
            headerShown: false,
            animationTypeForReplace: 'push'
          }} />
          
        </RootStack.Group>
        ) : (
          <RootStack.Group>
            <RootStack.Screen name="Auth" component={Auth}
            options={
              {
                headerLargeTitle: true,
                headerLargeStyle: {backgroundColor: colors.background},
                headerStyle: {backgroundColor: colors.card},
                headerTransparent: Platform.OS === 'ios' ? true : false,
                headerBlurEffect: 'systemThinMaterial',
                animationTypeForReplace: 'pop'
              }
            }
            />
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    )
}

export default RootNavigator