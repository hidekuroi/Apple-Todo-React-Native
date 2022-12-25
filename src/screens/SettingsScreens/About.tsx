import { useHeaderHeight } from "@react-navigation/elements"
import { StatusBar } from "expo-status-bar"
import React, { FC, useState } from "react"
import { View, ScrollView } from "react-native"
import Card from "../../components/Card"
import { useMyTheme } from "../../hooks/useMyTheme"

const About: FC = () => {
  const { colors } = useMyTheme()
  const headerHeight = useHeaderHeight()

  const [version, setVersion] = useState(["0.1.7pre", "etude"])

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
            text="Version"
            helperText={version[0]}
            onPress={() => setVersion([version[1], version[0]])}
            isLast
          />
        </Card>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default About
