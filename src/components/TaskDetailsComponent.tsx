import React, { FC, useEffect, useState } from "react"
import { Button, ScrollView, View } from "react-native"
import Card from "../components/Card"
import { useLocale } from "../hooks/useLocale"

type Props = {
    isFlagged?: boolean
    onFlag: (isFlagged: boolean) => void
}

const TaskDetailsComponent: FC<Props> = (props) => {
  const i18n = useLocale()
  const [isFlagged, setIsFlagged] = useState<boolean>(props.isFlagged || false)

  const flagHandler = () => {
    setIsFlagged(!isFlagged)
    props.onFlag(!isFlagged)
  }

  return (
      <View
      style={{ justifyContent: "center", alignItems: "center"}}
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
            switchValue={isFlagged}
            onSwitch={() => flagHandler()}
            icon={{ iconName: "flag", shape: "square", color: "orange" }}
          />
        </Card>
      </View>
  )
}

export default TaskDetailsComponent
