import { Ionicons } from "@expo/vector-icons"
import React, { FC, useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"

type IconpickerProps = {
  setColor: (color: string) => void
}
const Colorpicker: FC<IconpickerProps> = ({setColor}) => {
  const { colors } = useMyTheme()
  const dispatch = useAppDispatch()
  const [pickedColor, setPickedColor] = useState<string>('#0a84fe')

  const colorsArr1 = ['#ff453a', '#ff9f0a', '#ffd50a', '#30d15b', '#78c3fe', '#0a84fe']
  const colorsArr2 = ['#5e5ce6', '#fe4f79', '#d57ff5', '#c9a675', '#727e87', '#ebb5ae']

  
  const pickColor = (color: string) => {
    setPickedColor(color)
    setColor(color)
  }


  return (
    <View>
      <View style={{ width: "91.5%" }}>
        <View style={[styles.row, {marginBottom: 5}]}>
          
          {colorsArr1.map((color: string) => {
            return <View key={color} style={{height: 50, width: 50, borderRadius: 50, backgroundColor: pickedColor === color ? colors.inputPlaceholder : 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
            <Pressable onPress={() => pickColor(color)}>
            <View
              style={{height: 45, width: 45, borderRadius: 50, backgroundColor: colors.modalCard, justifyContent: "center", alignItems: "center"}}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  backgroundColor: color,
                }}
              ></View>
            </View>
            </Pressable>
            
          </View>
          })}

        </View>

        <View style={styles.row}>
        {colorsArr2.map((color: string) => {
            return <View style={{height: 50, width: 50, borderRadius: 50, backgroundColor: pickedColor === color ? colors.inputPlaceholder : 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
            <Pressable onPress={() => pickColor(color)}>
            <View
              style={{height: 45, width: 45, borderRadius: 50, backgroundColor: colors.modalCard, justifyContent: "center", alignItems: "center"}}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  backgroundColor: color,
                }}
              ></View>
            </View>
            </Pressable>
            
          </View>
          })}
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: "91.5%",
    borderRadius: 11,
    marginBottom: 36,
  },
  listItem: {
    fontSize: 17,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    // alignItems: 'center',
    width: "100%",
    justifyContent: "space-around",
  },
})

export default Colorpicker
