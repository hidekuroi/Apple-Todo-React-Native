import { Ionicons } from "@expo/vector-icons"
import React, { FC, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Switch,
} from "react-native"
import { useMyTheme } from "../hooks/useMyTheme"

type IconType = {
  color?: string
  shape: "ellipse" | "square"
  iconName: string
}

export type CardItemProps = {
  text: string
  helperText?: string
  indicatorColor?: string
  isFirst?: boolean
  isSingle?: boolean
  isLast?: boolean
  icon?: IconType
  chevron?: boolean
  loading?: boolean
  switchValue?: boolean
  disabled?: boolean
  isModalCard?: boolean

  onPress?: () => void
  onSwitch?: () => void
}

const CardItem: FC<CardItemProps> = React.memo(({
  text,
  helperText,
  isFirst,
  isSingle,
  isLast,
  icon,
  chevron,
  loading,
  switchValue,
  disabled,
  onPress,
  onSwitch,
  isModalCard,
  indicatorColor
}) => {
  const { colors } = useMyTheme()

  return (
    <TouchableHighlight
      style={[
        isSingle && { borderRadius: 11 },
        isFirst && { borderTopRightRadius: 11, borderTopLeftRadius: 11 },
        isLast && { borderBottomLeftRadius: 11, borderBottomRightRadius: 11 },
      ]}
      activeOpacity={1}
      underlayColor={isModalCard ? colors.modalTouching : colors.touching}
      onPress={onPress && !disabled ? () => onPress() : undefined}
    >
      <View style={styles.item}>
        {/* //?Border radius 8 for square and 50 for ellipse */}
        {icon && (
          <View style={[styles.iconPartWrapper]}>
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor: icon.color ? icon.color : "blue",
                  borderRadius: icon.shape === "ellipse" ? 50 : 8,
                  opacity: disabled ? 0.5 : 1,
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  left: 1,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* //? Idk. There are no exports of icon name strings.
            //? I'd be happy to use types here but they're just declaring it with plain | icon-name | icon-name2 | ...... */}
                {/* @ts-ignore */}
                <Ionicons size={20} color="white" name={icon.iconName} />
              </View>
            </View>
          </View>
        )}

        <View
          style={[
            styles.mainPartWrapper,
            !isLast &&
              !isSingle && {
                borderBottomWidth: 0.5,
                borderBottomColor: colors.divider,
              },
          ]}
        >
          <View style={styles.mainPart}>
            <Text
              style={[
                styles.taskTitleText,
                {
                  color: disabled ? colors.disabledText : colors.text,
                  marginLeft: icon ? 0 : 4,
                },
                isModalCard && {paddingVertical: 14}
              ]}
            >
              {icon
                ? `${text.substring(0, 17)}${text.length > 17 ? "..." : ""}`
                : text}
            </Text>
            <View style={styles.helperPart}>
              {helperText && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {indicatorColor && <View style={{backgroundColor: indicatorColor, borderRadius: 50, height: 8, width: 8, marginRight: 5}} />}
                <Text style={[{ color: colors.helperText }, styles.helperText]}>
                  {icon && text.length > 15
                    ? `${helperText.substring(0, 11)}${
                        helperText.length > 11 ? "..." : ""
                      }`
                    : `${helperText.substring(0, 22)}${
                      helperText.length > 22 ? "..." : ""
                    }`}
                </Text>
                </View>
              )}
              {chevron && (
                <View>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={19}
                      color={colors.helperIcon}
                    />
                  )}
                </View>
              )}
              {!chevron && switchValue !== undefined && (
                <Switch
                  disabled={disabled}
                  onChange={onSwitch ? () => onSwitch() : undefined}
                  value={switchValue}
                  style={{ margin: 0, padding: 0 }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
})

export default CardItem

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitleText: {
    fontSize: 17,
    paddingVertical: 11,
  },
  mainPartWrapper: {
    flexGrow: 1,
    paddingRight: 12,
    marginLeft: 12,
  },
  mainPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  iconPartWrapper: {
    marginLeft: 16,
    marginRight: 2,
  },
  iconBackground: {
    height: 30,
    width: 30,
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
