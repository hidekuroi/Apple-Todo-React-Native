import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC, useCallback, useEffect, useState } from "react"
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useMyTheme } from "../hooks/useMyTheme"
import { TaskInfoParamList } from "../types/navigation-types"
import Card from "../components/Card"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { TasksType, TodoType } from "../types/common"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { changeTask, createTask, getTasks } from "../features/todo/todo-slice"
import { StatusBar } from "expo-status-bar"
import { useLocale } from "../hooks/useLocale"
import TaskDetailsComponent from "../components/TaskDetailsComponent"

type TaskInfoModalProps = NativeStackScreenProps<TaskInfoParamList, "TaskInfo">

const TaskInfoModal: FC<TaskInfoModalProps> = ({ navigation, route }) => {
  const routeProps = route.params
  const { colors } = useMyTheme()
  const dispatch = useAppDispatch()
  const i18n = useLocale()
  const todoData = useTypedSelector((state) => state.todo.todoData)
  const cloudSettings = useTypedSelector((state) => {
    return state.settings.cloud.settings
  })
  const localSettings = useTypedSelector((state) => state.settings.local)

  const [title, setTitle] = useState<string>(
    routeProps.task ? routeProps.task.title : ""
  )
  const [isFlagged, setIsFlagged] = useState<number>(
    routeProps.task ? routeProps.task.priority : 1
  )
  const [listSettings, setListSettings] = useState<any>()
  const [description, setDescription] = useState<string>(
    routeProps.task ? routeProps.task.description : ""
  )

  // const [selectedList, setSelectedList] = useState<TodoType | undefined>(
  //   routeProps?.listId
  //     ? todoData.find((list: TodoType) => {
  //         list.id === routeProps.listId
  //       })
  //     : localSettings.selectedList.id ? todoData.find((list: TodoType) => {
  //       list.id === localSettings.selectedList.id
  //     }) : todoData[0]
  // )

  //? optimize and change setting get method
  let tempSettings: any = []

  useEffect(() => {
    if (!routeProps?.task) {
      cloudSettings.map((s: TasksType) => {
        if (
          localSettings.selectedList.id &&
          s.title === localSettings.selectedList.id
        ) {
          let temp = s.description.split(";")
          temp.map((i) => {
            const splitted = i.split("=")
            tempSettings[splitted[0]] = splitted[1]
          })
          setListSettings(tempSettings)
        } else if (
          !localSettings.selectedList.id &&
          s.title === todoData[0].id
        ) {
          let temp = s.description.split(";")
          temp.map((i) => {
            const splitted = i.split("=")
            tempSettings[splitted[0]] = splitted[1]
          })
          setListSettings(tempSettings)
        }
      })
    } else {
      console.log("getin")
      cloudSettings.map((s: TasksType) => {
        if (s.title === routeProps.task?.todoListId) {
          let temp = s.description.split(";")
          temp.map((i) => {
            const splitted = i.split("=")
            tempSettings[splitted[0]] = splitted[1]
          })
          setListSettings(tempSettings)
        }
      })
    }
  }, [cloudSettings, cloudSettings])

  useEffect(() => {
    //? does not work properly with native stack navigation
    // navigation.addListener('beforeRemove', (e) => {e.preventDefault()})
    navigation.setOptions({
      title: routeProps.task ? i18n.t("details") : i18n.t("titleNewtask"),
      headerLeft: () => (
        <Button
          title={i18n.t("cancel")}
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <Button
          title={routeProps.task ? i18n.t("done") : i18n.t("add")}
          disabled={title.length ? false : true}
          onPress={doneHandler}
          color={colors.primary}
        />
      ),
    })
    // if (routeProps?.title) {
    //   navigation.setOptions({ title: "Edit" })
    // }
  }, [title, description, isFlagged, localSettings.selectedList])

  const onFlag = (isFlagged: boolean) => {
    setIsFlagged(isFlagged ? 2 : 1)
    console.log('flaggin', isFlagged)
  }  

  const doneHandler = async () => {
    if (routeProps.task) {
      title !== routeProps.task.title ||
        description !== routeProps.task.description ||
        isFlagged !== routeProps.task.priority 
      await dispatch(
        changeTask(routeProps.task.todoListId, routeProps.task.id, {
          ...routeProps.task,
          title: title,
          description: description,
          priority: isFlagged,
        })
      )
      dispatch(getTasks(routeProps.task.todoListId))
    } else {
      dispatch(
        createTask(
          localSettings.selectedList.id
            ? localSettings.selectedList.id
            : todoData[0].id,
          title,
          description,
          isFlagged !== 1 ? isFlagged : undefined
        )
      )
    }
    navigation.goBack()
  }

  const navigateDetails = useCallback(() => {
    navigation.navigate("TaskDetails", {isFlagged: isFlagged === 1 ? false : true, onFlag})
  }, [isFlagged])

  const navigateSelectList = useCallback(() => {
    navigation.navigate("SelectList", {
      todoData,
      cloudSettings,
      isEditTask: routeProps.task ? true : false,
    })
  }, [])

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.modalBackground }}
    >
      <View
        style={{ justifyContent: "center", alignItems: "center", marginTop: 7 }}
      >
        <Card isModalCard>
          <View>
            <View>
              <TextInput
                multiline
                placeholder={i18n.t("title")}
                maxLength={100}
                placeholderTextColor={colors.modalInputPlaceholder}
                style={{
                  fontSize: 17,
                  paddingTop: 14,
                  paddingBottom: 14,
                  paddingRight: 12,
                  color: colors.text,
                  backgroundColor: "",
                  marginLeft: 12,
                  borderBottomColor: colors.modalDivider,
                  borderBottomWidth: 0.5,
                }}
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View>
              <TextInput
                placeholder={i18n.t("description")}
                placeholderTextColor={colors.modalInputPlaceholder}
                multiline
                value={description}
                onChangeText={setDescription}
                style={{
                  fontSize: 17,
                  paddingTop: 7,
                  paddingBottom: 21,
                  paddingRight: 12,
                  color: colors.text,
                  backgroundColor: "",
                  marginLeft: 12,
                }}
              />
            </View>
          </View>
        </Card>
        {routeProps.task ? (
          <View style={{ width: "100%" }}>
            <TaskDetailsComponent
              onFlag={(isFlagged: boolean) => onFlag(isFlagged)}
              isFlagged={routeProps.task.priority === 1 ? false : true}
            />
          </View>
        ) : (
          <Card isModalCard>
            <Card.Item
              text={i18n.t("details")}
              chevron
              onPress={navigateDetails}
            />
          </Card>
        )}
        <Card isModalCard>
          <Card.Item
            text={i18n.t("list")}
            chevron
            indicatorColor={listSettings?.accentColor}
            helperText={
              localSettings.selectedList.id
                ? localSettings.selectedList.title
                : todoData[0].title
            }
            onPress={navigateSelectList}
          />
        </Card>
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
    // paddingVertical: 10,
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

export default TaskInfoModal
