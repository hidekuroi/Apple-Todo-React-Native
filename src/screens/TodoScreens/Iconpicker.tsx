import { Ionicons } from "@expo/vector-icons"
import React, { FC, useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"

type IconpickerProps = {
  initialIcon: string
  setIcon: (color: string) => void
}
const Iconpicker: FC<IconpickerProps> = ({ setIcon, initialIcon }) => {
  const { colors, dark } = useMyTheme()
  const dispatch = useAppDispatch()
  const [pickedIcon, setPickedIcon] = useState<string>(initialIcon)

  const iconsArr = [
    ["list", "skull", "flower", "phone-portrait", "briefcase", "cash"],
    ["pizza", "color-palette", "basket", "list-circle", "mail", "earth"],
    ["desktop", "bookmark", "star", "hammer", "musical-note", "wallet"]
  ]

  const pickIcon = (icon: string) => {
    setPickedIcon(icon)
    setIcon(icon)
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "91.5%" }}>
          {iconsArr.map((row: Array<string>, index) => (
            <View key={index} style={[styles.row, { marginBottom: index+1 === iconsArr.length ? 0 : 5 }]}>
              {row.map((icon: string) => {
                return (
                  <View
                    key={icon}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 50,
                      backgroundColor:
                        pickedIcon === icon
                          ? colors.inputPlaceholder
                          : "rgba(0, 0, 0, 0)",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable onPress={() => pickIcon(icon)}>
                      <View
                        style={{
                          height: 45,
                          width: 45,
                          borderRadius: 50,
                          backgroundColor: colors.modalCard,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            backgroundColor: dark ? "#39393d" : "#f4f4f5",
                          }}
                        >
                          <View
                            style={{
                              position: "absolute",
                              left: 3,
                              right: 0,
                              top: 0,
                              bottom: 0,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {/* //? Idk. */}
                            <Ionicons
                              size={25}
                              color={
                                dark ? "rgb(240, 240, 240)" : "rgb(80, 80, 80)"
                              }
                              //@ts-ignore
                              name={icon}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                )
              })}
            </View>
          ))}

        <View style={styles.row}></View>
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

export default Iconpicker
