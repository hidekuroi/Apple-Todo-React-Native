import { Ionicons } from "@expo/vector-icons"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import React, { FC, useCallback, useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Alert,
  Platform,
} from "react-native"
import ListInfoInput from "../../components/ListInfoInput"
import { editListSetting } from "../../features/settings/settings-slice"
import {
  createTodolist,
  deleteTodolist,
  getTodos,
} from "../../features/todo/todo-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useLocale } from "../../hooks/useLocale"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { RootStackParamList } from "../../types/navigation-types"
import Colorpicker from "./Colorpicker"
import Iconpicker from "./Iconpicker"

type NewListModalProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateNewListModal"
>

const CreateNewListModal: FC<NewListModalProps> = ({ navigation, route }) => {
  const routeProps = route.params
  const { colors, dark } = useMyTheme()
  const dispatch = useAppDispatch()
  const i18n = useLocale()
  const todolistId = routeProps?.todolistId || ""
  const [title, setTitle] = useState<string>(routeProps?.title || "")
  const [iconNameValue, setIconNameValue] = useState<string>(
    routeProps?.iconNameValue || "list"
  )
  const [colorValue, setColorValue] = useState<string>(
    routeProps?.colorValue || "#0a84fe"
  )
  const [isInputActive, setIsInputActive] = useState<boolean>(false)
  const totalCount = useTypedSelector((state) => state.todo.totalCount)
  const localSettings = useTypedSelector((state) => state.settings.local)

  useEffect(() => {
    //? does not work properly with native stack navigation
    // navigation.addListener('beforeRemove', (e) => {e.preventDefault()})
    navigation.setOptions({
      headerLeft: () => (
        <Button title={i18n.t('cancel')} color={colors.primary} onPress={() => navigation.goBack()} />
      ),
      headerRight: () => <Button title={i18n.t('done')} disabled />,
    })
    if (routeProps?.title) {
      navigation.setOptions({ title: i18n.t('titleListinfo') })
    }
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
          title={i18n.t('done')}
          onPress={createListHandler}
          disabled={!title.length}
        />
      ),
    })
    // }
  }, [title, iconNameValue, colorValue])

  const handleChangeTitle = (text: string) => {
    setTitle(text)
  }

  const setColor = useCallback((color: string) => {
    setColorValue(color)
  }, [])

  const setIcon = useCallback((icon: string) => {
    setIconNameValue(icon)
  }, [])

  const createListHandler = () => {
    if(title !== 'SETTINGS') {
    if (!todolistId.length) {
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
        Alert.alert(i18n.t('listLimitTitle'), i18n.t('listLimitBody'), [
          { text: i18n.t('ok') },
        ])
      }
    } else {
      if (
        title !== routeProps.title ||
        iconNameValue !== routeProps.iconNameValue ||
        colorValue !== routeProps.colorValue
      ) {
        dispatch(
          editListSetting(
            todolistId,
            iconNameValue,
            colorValue,
            title !== routeProps.title ? title : undefined
          )
        )
        navigation.goBack()
      } else {
        navigation.goBack()
      }
    }
  } else {
    Alert.alert("This name is reserved for app to work properly", "You can change lettercase of the word if you want to use it.")
  }
  }

  const deleteHandler = () => {
    if(routeProps.todolistId && routeProps.title !== 'SETTINGS') {
    Alert.alert(
      `${i18n.t('delete')} "${routeProps.title}"`,
      i18n.t('deleteAlert'),
      [
        { text: i18n.t('cancel'), style: "cancel" },
        { text: i18n.t('delete'), style: "destructive", onPress: async () => {
          navigation.navigate("MainTabNavigator")
                  await dispatch(deleteTodolist(todolistId))
                  dispatch(getTodos())
        } },
      ],
      { userInterfaceStyle: dark ? "dark" : "light" }
    )
    }else {
      Alert.alert(i18n.t('cannotDelete'))
    }
  }

  console.log("updated")

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.modalBackground }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={[
            styles.list,
            { backgroundColor: colors.modalCard, marginTop: 10 },
          ]}
        >
          <View
            style={[
              styles.listItem,
              {
                width: "91.5%",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 10,
              },
            ]}
          >
            <View
              style={{
                backgroundColor: colorValue,
                shadowColor: colorValue,
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 10,
                width: 100,
                height: 100,
                borderRadius: localSettings.isSquareIcons ? 8 : 50,
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
            {/* <TextInput
              autoFocus
              placeholder="Name"
              value={title}
              clearButtonMode={'while-editing'}
              style={{
                padding: 4,
                fontSize: 24,
                paddingHorizontal: 15,
                color: colorValue,
                backgroundColor: isInputActive
                  ? colors.modalInputActive
                  : colors.modalInput,
                borderRadius: 11,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                height: 58,
              }}
              maxLength={100}
              onChangeText={setTitle}
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
            /> */}
            <ListInfoInput
              colorValue={colorValue}
              colors={colors}
              value={title}
              handleChange={(text: string) => handleChangeTitle(text)}
            />
          </View>
        </View>

        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <Colorpicker initialColor={colorValue} setColor={setColor} />
        </View>

        <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
          <Iconpicker initialIcon={iconNameValue} setIcon={setIcon} />
        </View>
        {todolistId && (
          <View style={[styles.list, { backgroundColor: colors.modalCard }]}>
            <View style={{ width: "100%" }}>
              <Button
                title={i18n.t('deleteList')}
                color="red"
                onPress={() => {
                  deleteHandler()
                }}
              />
            </View>
          </View>
        )}
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
