import React, { FC } from "react"
import { View, StyleSheet, Platform } from "react-native"
import { useMyTheme } from "../hooks/useMyTheme"
import CardItem, { CardItemProps } from "./CardItem"

const Card: FC<{
  children: Array<React.ReactNode> | React.ReactNode
  backgroundColor?: string
}> & { Item: FC<CardItemProps> } = ({
  children,
  backgroundColor,
}): JSX.Element => {
  const { colors } = useMyTheme()

  let childrenWithProps

  const childrenArray = React.Children.toArray(children)

  childrenWithProps = childrenArray.map((c, i) => {
    return React.cloneElement(
      c as JSX.Element,
      //! Damn, mb 'll optimize later
      childrenArray.length === 1
        ? { isSingle: true }
        : i === 0
        ? { isFirst: true }
        : i + 1 === childrenArray.length
        ? { isLast: true }
        : {}
    )
  })

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: backgroundColor ? backgroundColor : colors.card },
      ]}
    >
      <View>{childrenWithProps ? childrenWithProps : children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: Platform.OS === "ios" ? "91.5%" : "100%",
    borderRadius: 11,
    marginBottom: 36,
  },
})

Card.Item = CardItem

export default Card
