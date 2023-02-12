import { Ionicons } from "@expo/vector-icons"
import { useHeaderHeight } from "@react-navigation/elements"
import { BlurView } from "expo-blur"
import React, { FC } from "react"
import {
  Animated,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native"
import { AnimatedValue } from "react-navigation"
import { useLocale } from "../hooks/useLocale"
import { useMyTheme } from "../hooks/useMyTheme"

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

type Props = {
  topEdge: number | null
  scrollingY: AnimatedValue
  tasksLength?: number
  accentColor?: string

  onBtnTouch: () => void
}

const BottomToolbar: FC<Props> = ({
  topEdge,
  scrollingY,
  tasksLength,
  accentColor,
  onBtnTouch,
}) => {
  // const tabBarHeight = useBottomTabBarHeight()
  const barHeight = useHeaderHeight()
  const { colors, dark } = useMyTheme()
  const i18n = useLocale()

  console.log("Bottom bar")

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
      {Platform.OS === "ios" ? (
        <AnimatedBlurView
          tint={dark ? "dark" : "light"}
          intensity={100}
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: tasksLength
                ? topEdge
                  ? scrollingY.interpolate({
                      inputRange: [topEdge - 5, topEdge],
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
              { borderTopWidth: 0.5, borderTopColor: colors.divider },
            ]}
          ></View>
        </AnimatedBlurView>
      ) : (
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <TouchableOpacity
          onPress={onBtnTouch}
          style={{
            flexDirection: "row",
            paddingHorizontal: "2.5%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="add-circle"
            size={30}
            color={accentColor ? accentColor : colors.primary}
          />
          <Text
            style={{
              color: accentColor ? accentColor : colors.primary,
              marginLeft: 10,
              fontSize: 17,
            }}
          >
            {i18n.t('newTask')}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

export default BottomToolbar
