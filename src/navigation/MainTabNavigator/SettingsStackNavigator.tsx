import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { useMyTheme } from "../../hooks/useMyTheme";
import Settings from "../../screens/Settings";
import { SettingsStackParamList } from "../../types/navigation-types";
import About from "../../screens/About";
import Appearence from "../../screens/Appearence";

const SettingsStackNavigator = () => {

    const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

    const { colors } = useMyTheme()

    return(
      <SettingsStack.Navigator initialRouteName='Settings' 
      screenOptions={
        {
          
          // headerStyle: {backgroundColor: colors.background},
          headerTransparent: Platform.OS === 'ios' ? true : false,
          headerBlurEffect: 'systemThinMaterial',
          headerLargeStyle: {backgroundColor: colors.background}
          
        }
      }
      >
        <SettingsStack.Screen name="Settings" options={{
          headerLargeTitle: true,
          headerSearchBarOptions: {
            hideNavigationBar: true,
            placeholder: 'Search',
            hideWhenScrolling: true
          },

        }} component={Settings}/>
        <SettingsStack.Screen name="About" component={About} />
        <SettingsStack.Screen name="Appearence" component={Appearence} />
      </SettingsStack.Navigator>
    )
  }

export default SettingsStackNavigator;