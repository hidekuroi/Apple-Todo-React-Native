import { Ionicons } from "@expo/vector-icons"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { useHeaderHeight } from "@react-navigation/elements"
import { BlurView } from "expo-blur"
import React, { FC } from "react"
import { Animated, Text, StyleSheet, View, TouchableHighlight, TouchableOpacity, Platform } from "react-native"
import { interpolateColor, useAnimatedStyle } from "react-native-reanimated"
import { AnimatedValue } from "react-navigation"
import { useMyTheme } from "../hooks/useMyTheme"

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

type Props = {
  topEdge: number | null
  scrollingY: AnimatedValue
  tasksLength?: number
  accentColor?: string

  onBtnTouch: () => void
}

const BottomToolbar: FC<Props> = ({ topEdge, scrollingY, tasksLength, accentColor='blue', onBtnTouch }) => {
  // const tabBarHeight = useBottomTabBarHeight()
  const barHeight = useHeaderHeight()
  const { colors, dark } = useMyTheme()

  console.log('Bottom bar')

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          flex: 1,
          justifyContent: "center",
          height: barHeight / 1.5,
          width: "100%",
        },
      ]}
    >
      {Platform.OS === 'ios' ? <AnimatedBlurView
        tint={dark ? "dark" : "light"}
        intensity={100}
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: tasksLength
              ? topEdge
                ? scrollingY.interpolate({
                    inputRange: [topEdge - 20, topEdge],
                    outputRange: [1, 0],
                  })
                : 1
              : 0,
          },
        ]}
      >
        {/* //?If you need border */}
        <View
          style={[
            StyleSheet.absoluteFill,
            { borderTopWidth: 1, borderTopColor: colors.divider },
          ]}
        ></View>
      </AnimatedBlurView> : 
      <View style={[StyleSheet.absoluteFill, {backgroundColor: colors.card}]} />
      }
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%'}}>
        <TouchableOpacity onPress={onBtnTouch} style={{flexDirection: 'row', paddingHorizontal: '2.5%', height: '100%', alignItems: 'center'}}>
            <Ionicons name='add-circle' size={30} color={accentColor} />
            <Text style={{ color: accentColor, marginLeft: 10, fontSize: 17,  }}>New task</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

export default BottomToolbar
