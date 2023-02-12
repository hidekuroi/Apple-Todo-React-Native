import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC, useEffect, useState } from "react"
import { Button, ScrollView, View } from "react-native"
import Card from "../../components/Card"
import { useLocale } from "../../hooks/useLocale"
import { useMyTheme } from "../../hooks/useMyTheme"
import { TaskInfoParamList } from "../../types/navigation-types"

type TaskDetailsModalProps = NativeStackScreenProps<
  TaskInfoParamList,
  "TaskDetails"
>

const TaskDetails: FC<TaskDetailsModalProps> = ({ navigation }) => {
  const { colors } = useMyTheme()
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
        style={{ justifyContent: "center", alignItems: "center", marginTop: 7 }}
      >
        <Card isModalCard>
          <Card.Item
            text={i18n.t('tags')}
            disabled
            chevron
            icon={{ iconName: "code-slash", shape: "square", color: "gray" }}
          />
        </Card>
        <Card isModalCard>
          <Card.Item
            text={i18n.t('flag')}
            disabled
            switchValue={isFlagged}
            onSwitch={() => setIsFlagged(!isFlagged)}
            icon={{ iconName: "flag", shape: "square", color: "orange" }}
          />
        </Card>
      </View>
    </ScrollView>
  )
}

export default TaskDetails
