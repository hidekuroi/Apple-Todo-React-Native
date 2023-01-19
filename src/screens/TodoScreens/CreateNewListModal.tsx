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
import { createTodolist, getTodos } from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TodoStackParamList } from "../../types/navigation-types"

type NewListModalProps = NativeStackScreenProps<
  TodoStackParamList,
  "CreateNewListModal"
>

const CreateNewListModal: FC<NewListModalProps> = ({ navigation }) => {
  const { colors } = useMyTheme()
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>("")
  const [iconNameValue, setIconNameValue] = useState<string>("")
  const [colorValue, setColorValue] = useState<string>("")
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

  const createListHandler = () => {
    if (totalCount < 10) {
      dispatch(createTodolist(title, iconNameValue ? iconNameValue : "list", colorValue ? colorValue : "#356ce2")).then(() => {
        // dispatch(getTodos())
        navigation.goBack()
      })
    } else {
      Alert.alert("Limit", "You now have max possible number of lists", [
        { text: "Ok" },
      ])
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.modalBackground }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <View style={[styles.listItem, { padding: 10, margin: 5 }]}>
            <TextInput
              autoFocus
              placeholder="Name"
              value={title}
              style={{ padding: 4, fontSize: 17, color: colors.text }}
              onChangeText={setTitle}
            />
          </View>
        </View>
        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <View style={[styles.listItem, { padding: 10, margin: 5 }]}>
            <TextInput
              placeholder="Icon name"
              defaultValue={iconNameValue}
              style={{ padding: 4, fontSize: 17, color: colors.text }}
              onChangeText={(text) => {
                console.log(iconNameValue)
                setIconNameValue(text)
              }}
            />
          </View>
        </View>
        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <View style={[styles.listItem, { padding: 10, margin: 5 }]}>
            <TextInput
              placeholder="Color"
              value={colorValue}
              style={{ padding: 4, fontSize: 17, color: colors.text }}
              onChangeText={setColorValue}
            />
          </View>
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
    marginBottom: 36,
  },
  listItem: {
    fontSize: 17,
    paddingVertical: 5,
  },
})

export default CreateNewListModal
