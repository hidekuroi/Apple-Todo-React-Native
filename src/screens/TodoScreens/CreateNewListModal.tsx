import { Ionicons } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import React, { FC, useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native"
import { todoAPI } from "../../api/todo-api"
import Card from "../../components/Card"
import { createTodolist, getTodos } from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TodoStackParamList } from "../../types/navigation-types"
import Colorpicker from "./Colorpicker"
import Iconpicker from "./Iconpicker"

type NewListModalProps = NativeStackScreenProps<
  TodoStackParamList,
  "CreateNewListModal"
>

const CreateNewListModal: FC<NewListModalProps> = ({ navigation }) => {
  const { colors } = useMyTheme()
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>("")
  const [iconNameValue, setIconNameValue] = useState<string>("list")
  const [colorValue, setColorValue] = useState<string>("#0a84fe")
  const [isInputActive, setIsInputActive] = useState<boolean>(false)
  const totalCount = useTypedSelector((state) => state.todo.totalCount)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Cancel"
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => <Button title="Done" disabled />,
    })
  }, [])

  useEffect(() => {
    // if(prevTitle?.length === 0 && title.length > 0) {
    //   console.log('enabled')
    //   navigation.setOptions({
    //     headerRight: () => <Button onPress={() => createListHandler()} title="Done" disabled={false}/>,
    //   })
    // }
    // else if(prevTitle?.length > 0 && title.length === 0) {
    //! MAKE THIS WORK
    navigation.setOptions({
      headerRight: () => (
        <Button
          color={colors.primary}
          title="Done"
          onPress={createListHandler}
          disabled={!title.length}
        />
      ),
    })
    // }
  }, [title, iconNameValue, colorValue])

  const setColor = (color: string) => {
    setColorValue(color)
  }

  const setIcon = (icon: string) => {
    setIconNameValue(icon)
  }

  const createListHandler = () => {
    if (totalCount < 10) {
      dispatch(
        createTodolist(
          title,
          iconNameValue ? iconNameValue : "list",
          colorValue ? colorValue : "#0a84fe"
        )
      ).then(() => {
        // dispatch(getTodos())
        navigation.goBack()
      })
    } else {
      Alert.alert("Limit", "You now have max possible number of lists", [
        { text: "Ok" },
      ])
    }
  }

  console.log('updated')

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.modalBackground }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <View
            style={[styles.listItem, { width: "91.5%", alignItems: "center", marginBottom: 20, marginTop: 10 }]}
          >
            <View
              style={{
                backgroundColor: colorValue,
                shadowColor: colorValue,
                shadowOpacity: 0.3,
                shadowOffset: {width: 0, height: 3},
                shadowRadius: 10,
                width: 100,
                height: 100,
                borderRadius: 50,
                opacity: 1,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 4,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* //? Idk. */}
                {/* @ts-ignore */}
                <Ionicons size={60} color="white" name={iconNameValue} />
              </View>
            </View>
          </View>
          <View style={[styles.listItem, { width: "91.5%", marginBottom: 10 }]}>
            <TextInput
              autoFocus
              placeholder="Name"
              value={title}
              style={{
                padding: 4,
                fontSize: 24,
                color: colors.text,
                backgroundColor: isInputActive ? colors.modalInputActive : colors.modalInput,
                borderRadius: 11,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                height: 58,
              }}
              onChangeText={setTitle}
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
            />
          </View>
        </View>

        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <Colorpicker setColor={(color: string) => setColor(color)} />
        </View>

        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <Iconpicker setIcon={(icon: string) => setIcon(icon)} />
        </View>

      </View>
      <StatusBar style="light" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    width: "91.5%",
    borderRadius: 11,
    marginBottom: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {},
  iconPartWrapper: {
    marginLeft: 16,
    marginRight: 2,
  },
  iconBackground: {
    height: 30,
    width: 30,
  },
})

export default CreateNewListModal
