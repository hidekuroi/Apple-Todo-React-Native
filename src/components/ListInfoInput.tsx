import React, { FC, useState } from 'react'
import { TextInput } from 'react-native'
import { useLocale } from '../hooks/useLocale'
import { ColorsType } from '../themes/colors'

type ListInfoInputProps = {
    value: string
    colorValue: string
    colors: ColorsType

    handleChange: (text: string) => void
}

//? make this + same thing for TaksInfoModal

const ListInfoInput: FC<ListInfoInputProps> = (props) => {

    const [isInputActive, setIsInputActive] = useState<boolean>(false)
    const i18n = useLocale()

    

  return (
    <TextInput
              autoFocus
              placeholder={i18n.t('listName')}
              value={props.value}
              onEndEditing={() => console.log('dixo')}
              clearButtonMode={'while-editing'}
              style={{
                padding: 4,
                fontSize: 24,
                paddingHorizontal: 15,
                color: props.colorValue,
                backgroundColor: isInputActive
                  ? props.colors.modalInputActive
                  : props.colors.modalInput,
                borderRadius: 11,
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                height: 58,
              }}
              maxLength={100}
              onChangeText={(text) => props.handleChange(text)}
              onFocus={() => setIsInputActive(true)}
              onBlur={() => setIsInputActive(false)}
            />
  )
}

export default React.memo(ListInfoInput)