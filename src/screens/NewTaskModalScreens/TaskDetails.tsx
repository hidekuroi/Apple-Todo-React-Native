import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC, useEffect, useState } from "react"
import { Button, ScrollView, View } from "react-native"
import Card from "../../components/Card"
import TaskDetailsComponent from "../../components/TaskDetailsComponent"
import { useLocale } from "../../hooks/useLocale"
import { useMyTheme } from "../../hooks/useMyTheme"
import { TaskInfoParamList } from "../../types/navigation-types"

type TaskDetailsModalProps = NativeStackScreenProps<
  TaskInfoParamList,
  "TaskDetails"
>

const TaskDetails: FC<TaskDetailsModalProps> = ({ navigation, route }) => {
  const { colors } = useMyTheme()
  const routeProps = route.params
  const i18n = useLocale()
  const [isFlagged, setIsFlagged] = useState<boolean>(false)

  useEffect(() => {
    //? does not work properly with native stack navigation
    // navigation.addListener('beforeRemove', (e) => {e.preventDefault()})
    navigation.setOptions({
      title: i18n.t('details'),
      headerRight: () => <Button title={i18n.t('add')} disabled />,
    })
  }, [])

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.modalBackground }}
    >
      <View
        style={{ marginTop: 7 }}
      >
        <TaskDetailsComponent isFlagged={routeProps.isFlagged} onFlag={routeProps.onFlag}/>
      </View>
    </ScrollView>
  )
}

export default TaskDetails
