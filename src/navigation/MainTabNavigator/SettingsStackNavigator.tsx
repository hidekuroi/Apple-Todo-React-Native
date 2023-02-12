import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Platform } from "react-native"
import { useMyTheme } from "../../hooks/useMyTheme"
import Settings from "../../screens/SettingsScreens/Settings"
import About from "../../screens/SettingsScreens/About"
import Appearence from "../../screens/SettingsScreens/Appearence"
import Profile from "../../screens/SettingsScreens/Profile"
import { SettingsStackParamList } from "../../types/navigation-types"
import TodoSettings from "../../screens/SettingsScreens/TodoSettings"
import { useLocale } from "../../hooks/useLocale"

const SettingsStackNavigator = () => {
  const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

  const { colors } = useMyTheme()
  const i18n = useLocale()

  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        // headerStyle: {backgroundColor: colors.background},
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerBlurEffect: "systemThinMaterial",
        headerLargeStyle: { backgroundColor: colors.background },
        animation: "default",
      }}
    >
      <SettingsStack.Screen
        name={'Settings'}
        options={{
          headerLargeTitle: true,
          title: i18n.t('settingsTab')
        }}
        component={Settings}
      />
      <SettingsStack.Screen name="About" options={{title: i18n.t('about')}} component={About} />
      <SettingsStack.Screen name="Appearence" options={{title: i18n.t('appearence')}} component={Appearence} />
      <SettingsStack.Screen name="Profile" options={{title: i18n.t('profile')}} component={Profile} />
      <SettingsStack.Screen name="TodoSettings" options={{title: i18n.t('todosettings'), headerBackTitle: i18n.locale === 'ru' ? i18n.t('back') : i18n.t('settingsTab')}} component={TodoSettings} />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNavigator
