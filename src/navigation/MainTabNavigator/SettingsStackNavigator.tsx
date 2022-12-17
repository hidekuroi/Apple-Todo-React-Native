import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { useMyTheme } from "../../hooks/useMyTheme";
import Settings from "../../screens/Settings";
import { SettingsStackParamList } from "../../types/navigation-types";

const SettingsStackNavigator = () => {

    const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

    const { colors } = useMyTheme()

    return(
      <SettingsStack.Navigator initialRouteName='Settings' 
      screenOptions={
        {
          headerLargeTitle: true,
          headerLargeStyle: {backgroundColor: colors.background},
          // headerStyle: {backgroundColor: colors.card},
          headerTransparent: Platform.OS === 'ios' ? true : false,
          headerBlurEffect: 'systemThinMaterial',
          headerSearchBarOptions: {
            hideNavigationBar: true,
            placeholder: 'Search',
            hideWhenScrolling: true
          },
        }
      }
      >
        <SettingsStack.Screen name="Settings" component={Settings}/>
      </SettingsStack.Navigator>
    )
  }

export default SettingsStackNavigator;