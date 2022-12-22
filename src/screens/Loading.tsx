import { StatusBar } from "expo-status-bar"
import React, { FC } from "react"
import { ActivityIndicator, View } from "react-native"

const Loading: FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>

      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

export default Loading
