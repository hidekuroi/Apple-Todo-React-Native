import { useHeaderHeight } from "@react-navigation/elements"
import { StatusBar } from "expo-status-bar"
import React, { FC, useState } from "react"
import { View, ScrollView } from "react-native"
import Card from "../../components/Card"
import { editLocalSetting } from "../../features/settings/settings-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"

const TodoSettings: FC = () => {
  const { colors } = useMyTheme()
  const headerHeight = useHeaderHeight()
  const dispatch = useAppDispatch()

  const isSettingsListVisible = useTypedSelector((state) => state.settings.local.isSettingsListVisible)

  const [value, setValue] = useState<boolean>(isSettingsListVisible)

  const switchHandler = () => {
    setValue(!value)
    dispatch(editLocalSetting({settingName: 'isSettingsListVisible', settingValue: !value}))
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
          <Card.Item
            text="Visible settings list"
            switchValue={value}
            onSwitch={() => switchHandler()}
            isLast
          />
        </Card>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default TodoSettings
