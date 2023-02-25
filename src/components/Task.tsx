import { Ionicons } from "@expo/vector-icons"
import React, { FC, useEffect, useState } from "react"
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
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
  inputAccessoryID?: string
  taskInfoHandler?: (task: TasksType) => void
  handleChange?: (task: UpdateTaskModel, todolistId: string, id: string) => void
  handleDelete?: (todolistId: string, id: string) => void
  handleCreate?: (todolistId: string, title: string) => void
}

const Task: FC<Props> = React.memo(({
  task,
  index,
  colors,
  btnColor,
  isCreatingTask = false,
  listId,
  taskInfoHandler,
  inputAccessoryID,
  handleChange,
  handleDelete,
  handleCreate
}) => {
  const [taskData, setTaskData] = useState<TasksType>(
    task
      ? task
      : {
          addedDate: Date.now().toString(),
          completed: false,
          deadline: "",
          description: "",
          id: "",
          order: 0,
          priority: 0,
          startDate: "",
          status: 0,
          title: "",
          todoListId: listId,
        }
  )
  const [isCreating, setIsCreating] = useState<boolean>(isCreatingTask)
  const [status, setStatus] = useState<boolean>(
    taskData.status ? true : false
  )
  const [taskTitle, setTaskTitle] = useState<string>(
    task?.title && !isCreating ? task.title : ""
  )
  const [visible, setVisible] = useState<boolean>(true)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    if (!isCreating) {
      let taskStatus = task && task.status ? true : false
      if (taskStatus !== status) setStatus(taskStatus)
      if (task && taskTitle !== task.title) setTaskTitle(task.title)
      // console.log(task, taskData)
      task && setTaskData(task)
      // console.log('task')
    }
  }, [task])
  console.log("taskRENDER")
  const radioHandle = () => {
    Platform.OS !== 'web' && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setStatus(!status)

    if (!isCreating) {
      const updatedTask: UpdateTaskModel = {
        ...taskData,
        status: status ? 0 : 1,
      }
      handleChange && handleChange(updatedTask, taskData.todoListId, taskData.id)
    }
  }
 //? lmao are you an idiot?
  const changeTitle = () => {
    setIsFocused(false)
    if (!isCreating) {
      if (taskTitle !== taskData.title) {
        if (taskTitle.trim().length && handleChange) {
          const updatedTask: UpdateTaskModel = {
            ...taskData,
            title: taskTitle,
          }
          handleChange(updatedTask, taskData.todoListId, taskData.id)
          
          
        } else {
          handleDelete && handleDelete(taskData.todoListId, taskData.id)
          setVisible(false)
        }
      }
    } else {
      if (taskTitle && handleCreate) {
        handleCreate(listId, taskTitle).then((data) => {
          if (data?.item) {
            console.log(data)
            setTaskData(data?.item)
            setIsCreating(false)
          } else alert("Some error occured")
        })
      } else setVisible(false)
    }
  }

  const handleInfo = () => {
    if(task && taskInfoHandler) taskInfoHandler(task)
  }

  if (index === 1) console.log("TASK")

  return visible ? (
    <View
      style={{
        // paddingVertical: 10,
        flexDirection: "row",
        paddingHorizontal: 0,
        
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 7,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          //? Maybe 'll delete this one to make icon at the start of task
          // alignItems: "center",
          width: '100%',
          paddingLeft: '2.5%',

        }}
      >
        <Pressable onPress={radioHandle} style={{marginTop: 0}}>
          <Ionicons
            selectionColor={"none"}
            color={status ? btnColor : colors.disabledText}
            size={30}
            name={status ? "radio-button-on" : "radio-button-off"}
          />
        </Pressable>

        <View
          // onLongPress={(e: any) => console.log("dixon")}
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: colors.divider,
            // paddingVertical: 10,
            paddingBottom: 10,
            flexShrink: 1,
            marginLeft: 10,
            width: "100%",
            paddingRight: '2.5%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View style={{flexShrink: 1, flexDirection: 'column', width: '100%'}}>
          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            onBlur={changeTitle}
            onFocus={() => setIsFocused(true)}
            blurOnSubmit
            autoFocus={isCreating}
            scrollEnabled={false}
            spellCheck={false}
            maxLength={100}
            keyboardType={'default'}
            inputAccessoryViewID={inputAccessoryID}
            
            multiline
            style={{
              color: status ? colors.disabledText : colors.contrastText,
              fontSize: 17,
              fontWeight: '400',
              width: '100%'              
            }}
          />
          {task?.description && <Text style={{color: colors.disabledText, marginTop: 2}}>{task.description}</Text>}
          </View>
          <View style={{flexDirection: 'row'}}>
              {task?.priority === 2 && <Pressable style={{paddingHorizontal: 10}}><Ionicons size={20} color={'#FF9900'} name="flag" /></Pressable>}
              {isFocused && <TouchableOpacity onPress={handleInfo}><Ionicons size={28} color={btnColor} name="information-circle-outline" /></TouchableOpacity>}
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={{ display: "none" }}></View>
  )
})

export default Task
