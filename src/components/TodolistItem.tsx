import { Ionicons } from "@expo/vector-icons"
import React, { FC, useMemo } from "react"
import { View, StyleSheet, Text, TouchableHighlight } from "react-native"
import { useMyTheme } from "../hooks/useMyTheme"

type TodolistProps = {
  text: string
  isLast?: boolean
  helperText?: string
  iconName?: string
  accentColor?: string
  isSquare?: boolean
  chevron?: boolean
  isSelected?: boolean
  isModal?: boolean

  handlePress: (color: string) => void
}

const TodolistItem: FC<TodolistProps> = React.memo(({
  text,
  handlePress,
  isLast = false,
  helperText,
  iconName,
  accentColor,
  isSquare,
  chevron,
  isSelected,
  isModal
}) => {
  const { colors } = useMyTheme()

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={colors.touching}
      onPress={() => handlePress(accentColor ? accentColor : "#0a84fe")}
    >
      <View style={styles.item}>
        {/* //?Border radius 8 for square and 50 for ellipse */}
        <View style={[styles.iconPartWrapper, isModal && {marginLeft: "4.25%"}]}>
          {text !== "SETTINGS" && (
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor: accentColor ? accentColor : "#0a84fe",
                  borderRadius: isSquare ? 8 : 50,
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  left: 1.7,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  size={20}
                  color={"white"}
                  //@ts-ignore
                  name={iconName ? iconName : "list"}
                />
              </View>
            </View>
          )}
        </View>

        <View
          style={[
            styles.mainPartWrapper,
            isLast && {
              borderBottomWidth: 0.7,
              borderBottomColor: colors.divider,
              flexShrink: 1,
            },
            isModal && {marginLeft: "4.25%"}
          ]}
        >
          <View style={styles.mainPart}>
            <Text
              style={[
                styles.taskTitleText,
                {
                  color: colors.text,
                  fontWeight: text.startsWith("*") ? "bold" : "normal",
                  flexShrink: 1,
                  marginRight: 12,
                },
              ]}
            >
              {text}
            </Text>
            <View style={styles.helperPart}>
              {helperText && (
                <Text style={[{ color: colors.helperText }, styles.helperText]}>
                  {helperText}
                </Text>
              )}
              {chevron ? (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.helperIcon}
                />
              ) : isSelected && <Ionicons name="checkmark" size={24} color={colors.primary} />}
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
})

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitleText: {
    fontSize: 17,
    paddingVertical: 16,

  },
  mainPartWrapper: {
    flexGrow: 1,
    paddingRight: 12,
    marginLeft: 12,
  },
  mainPart: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconPartWrapper: {
    marginLeft: 12,
  },
  iconBackground: {
    height: 32,
    width: 32,
  },

  helperPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  helperText: {
    paddingRight: 6,
    fontSize: 17,
  },
})

export default TodolistItem
