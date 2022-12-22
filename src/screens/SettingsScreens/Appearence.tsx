import { useHeaderHeight } from "@react-navigation/elements"
import { StatusBar } from "expo-status-bar"
import React, { FC, useState } from "react"
import { View, Text, ScrollView, Button, Platform } from "react-native"
import Card from "../../components/Card"
import { useMyTheme } from "../../hooks/useMyTheme"

const Appearence: FC = () => {
  const { colors, dark } = useMyTheme()
  const headerHeight = useHeaderHeight()

  const [value, setValue] = useState(false)

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
          <Card.Item text="Theme" helperText={dark ? "Dark" : "Light"} isLast />
        </Card>
        <Card>
          <Card.Item
            text="test"
            isLast
            switchValue={value}
            onSwitch={() => setValue(!value)}
          />
        </Card>
        {value && (
          <Button
            title="Secret button"
            color={colors.primary}
            onPress={() => alert("Dxon Broudi")}
          />
        )}
        <Text
          style={{ color: Platform.OS === "ios" ? colors.test : colors.text }}
        >
          Platform colors
        </Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Appearence
