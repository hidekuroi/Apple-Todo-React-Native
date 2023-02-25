import { useHeaderHeight } from "@react-navigation/elements"
import { StatusBar } from "expo-status-bar"
import React, { FC, useState } from "react"
import { View, Text, ScrollView, Platform } from "react-native"
import Card from "../../components/Card"
import { editLocalSetting } from "../../features/settings/settings-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useLocale } from "../../hooks/useLocale"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"

const Appearence: FC = () => {
  const { colors, dark } = useMyTheme()
  const headerHeight = useHeaderHeight()
  const dispatch = useAppDispatch()

  const setting = useTypedSelector(
    (state) => state.settings.local.isSquareIcons
  )

  const [value, setValue] = useState(setting)

  const i18n = useLocale()

  const switchHandler = () => {
    setValue(!value)
    dispatch(
      editLocalSetting({ settingName: "isSquareIcons", settingValue: !value })
    )
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: headerHeight / 2,
        }}
      >
        <Card>
          <Card.Item text={i18n.t('appearenceTheme')} helperText={dark ? i18n.t('appearenceDark') : i18n.t('appearenceLight')} isLast />
        </Card>
        <Card>
          <Card.Item
            text={i18n.t('appearenceIcons')}
            isLast
            switchValue={value}
            onSwitch={() => switchHandler()}
          />
        </Card>
        <Text
          style={{ color: Platform.OS === "ios" ? colors.test : colors.text }}
        >
          Platform colors
        </Text>
        <Text style={{color: colors.text}}>{i18n.t('test')}</Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Appearence
