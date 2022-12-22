import { Ionicons } from "@expo/vector-icons"
import React, { FC, useEffect, useState } from "react"
import {
  Pressable,
  Text,
  View,
} from "react-native"
import { ColorsType } from "../themes/colors"
import { TasksType } from "../types/common"
import * as Haptics from "expo-haptics"

type Props = {
  task: TasksType
  index: number
  btnColor: string
  colors: ColorsType
}

const Task: FC<Props> = ({ task, index, colors, btnColor }) => {
  const [status, setStatus] = useState<boolean>(task.status ? true : false)

  useEffect(() => {
    let taskStatus = task.status ? true : false
    if (taskStatus !== status) setStatus(taskStatus)
    console.log('task')
  }, [task])

  const radioHandle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setStatus(!status)
  }

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

        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: colors.divider,
            paddingVertical: 10,
            flexShrink: 1,
            marginLeft: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: status ? colors.disabledText : colors.text,
              fontSize: 17,
            }}
          >
            {task.title}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Task
