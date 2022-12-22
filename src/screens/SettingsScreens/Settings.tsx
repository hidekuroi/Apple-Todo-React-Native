import { StatusBar } from "expo-status-bar"
import React, { FC } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  ActionSheetIOS,
  Platform,
} from "react-native"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { signOut } from "../../features/auth/auth-slice"
import { useMyTheme } from "../../hooks/useMyTheme"
import CardItem from "../../components/CardItem"
import Card from "../../components/Card"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { SettingsStackParamList } from "../../types/navigation-types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  "Settings"
>

const Settings: FC<SettingsScreenProps> = ({ navigation }) => {
  const { colors, dark } = useMyTheme()
  const { login } = useTypedSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const signOutHandler = () => {
    dispatch(signOut())
  }

  const btnHandler = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: "Are you sure you want to log out?",
          options: ["Cancel", "Log Out"],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          userInterfaceStyle: dark ? "dark" : "light",
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            console.log("cancel")
          } else {
            signOutHandler()
          }
        }
      )
    } else {
      signOutHandler()
    }
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Card>
          <Card.Item
            text="Profile"
            helperText={login}
            onPress={() => navigation.navigate("Profile")}
            icon={{ iconName: "person", shape: "square", color: "#757de8" }}
            isLast
            chevron
          />
        </Card>

        <Card>
          <Card.Item
            text="Lorem ipsum odolore irokinum"
            disabled
            helperText="13"
            onPress={() => console.log("dixy")}
            icon={{
              iconName: "cog-outline",
              shape: "square",
              color: colors.inputPlaceholder,
            }}
            chevron
          />
          <Card.Item
            text="Appearence"
            helperText={dark ? "Dark" : "Light"}
            onPress={() => navigation.navigate("Appearence")}
            icon={{
              iconName: "color-palette",
              shape: "square",
              color: "#ff69cc",
            }}
            chevron
          />
          <Card.Item
            text="Todo settings"
            disabled
            onPress={() => console.log("dixy")}
            isLast
            icon={{ iconName: "list", shape: "square", color: "#ff5000" }}
            chevron
          />
        </Card>

        <Card>
          <CardItem
            text="About"
            onPress={() => navigation.navigate("About")}
            isLast
            icon={{
              iconName: "information-circle",
              shape: "square",
              color: colors.primary,
            }}
            chevron
          />
        </Card>

        <Card>
          <Button
            title="Log Out"
            color={colors.notification}
            onPress={btnHandler}
          />
        </Card>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    width: Platform.OS === "ios" ? "91.5%" : "100%",
    borderRadius: 11,
    marginBottom: 36,
  },
  cardItem: {
    fontSize: 17,
    paddingVertical: 0,
  },
})

export default Settings
