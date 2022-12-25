import { Ionicons } from "@expo/vector-icons"
import React, { FC, useEffect, useState } from "react"
import {
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native"
import { ColorsType } from "../themes/colors"
import { TasksType, UpdateTaskModel } from "../types/common"
import * as Haptics from "expo-haptics"
import { changeTask, createTask, deleteTask } from "../features/todo/todo-slice"
import { useAppDispatch } from "../hooks/useAppDispatch"

type Props = {
  task?: TasksType
  listId: string
  index: number
  btnColor: string
  colors: ColorsType
  isCreatingTask?: boolean
}

const Task: FC<Props> = ({ task, index, colors, btnColor, isCreatingTask=false, listId }) => {
  const dispatch = useAppDispatch()
  const [isCreating, setIsCreating] = useState<boolean>(isCreatingTask)
  const [status, setStatus] = useState<boolean>(task?.status && !isCreating ? true : false)
  const [taskTitle, setTaskTitle] = useState<string>(task?.title && !isCreating ? task.title : '')
  const [taskId, setTaskId] = useState<string>(task?.id ? task?.id : '')


  useEffect(() => {
    if(!isCreating) {
    let taskStatus = task.status ? true : false
    if (taskStatus !== status) setStatus(taskStatus)
    if (taskTitle !== task.title) setTaskTitle(task.title)
    // console.log('task')
    }
  }, [task])
// console.log('taskRENDER')
  const radioHandle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setStatus(!status)

    if(!isCreating) {
      const updatedTask: UpdateTaskModel = {
        ...task,
        status: task.status ? 0 : 1
      }
      dispatch(changeTask(task.todoListId, task.id, updatedTask))
    }
  }

  const changeTitle = () => {
    if(!isCreating) {
      if(taskTitle !== task.title) {
        if(taskTitle.length) {
          const updatedTask: UpdateTaskModel = {
            ...task,
            title: taskTitle
          }
          dispatch(changeTask(task.todoListId, task.id, updatedTask))
        }
        else {
          dispatch(deleteTask(task.todoListId, task.id))
        }
      }
    }
    else {
      if(taskTitle) dispatch(createTask(listId, taskTitle)).then((data) => {
        console.log(data)
      })
    }
  }

  if(index === 1) console.log('TASK')

  return (
    <View
      style={{
        // paddingVertical: 10,
        flexDirection: "row",
        paddingHorizontal: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "95%",
          flexDirection: "row",
          justifyContent: "flex-start",
          //? Maybe 'll delete this one to make icon at the start of task 
          alignItems: "center",
        }}
      >
        <Pressable onPress={radioHandle}>
          <Ionicons
            selectionColor={"none"}
            color={status ? btnColor : colors.disabledText}
            size={30}
            name={status ? "radio-button-on" : "radio-button-off"}
          />
        </Pressable>

        <Pressable
          onLongPress={(e: any) => console.log('dixon')}
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: colors.divider,
            paddingVertical: 10,
            flexShrink: 1,
            marginLeft: 10,
            width: "100%",
          }}
        >
          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            onBlur={changeTitle}
            blurOnSubmit
            autoFocus={isCreating}
            scrollEnabled={false}
            spellCheck={false}
            multiline
            style={{
              color: status ? colors.disabledText : colors.text,
              fontSize: 17,
            }}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default Task
