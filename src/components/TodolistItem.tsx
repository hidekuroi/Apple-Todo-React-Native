import { Ionicons } from '@expo/vector-icons'
import React, { FC, useMemo } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useMyTheme } from '../hooks/useMyTheme'

type TodolistProps = {
  text: string,
  isLast?: boolean,

  handlePress: (color: string) => void
}

const TodolistItem: FC<TodolistProps> = ({text, handlePress, isLast = false}) => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors } = useMyTheme()

  const randomColor = () => {
    let value: string
    const num = Math.round(Math.random() * 10)
    switch(num) {
      case 1:
      case 2:
      case 3:
        value = 'tomato'
        break;
      case 4:
      case 5:
      case 6:  
        value = '#356ce2'
        break;
      case 7:
      case 8:
      case 9: 
        value = '#ff69cc'
        break;
      case 10:
      case 0:
        value = '#2fdeb1'
        break;
      default:
        value = 'red'
    }
    return value
  }

  let iconColor: string = useMemo(() => randomColor(), [])


  return (
    <TouchableHighlight
     activeOpacity={1} underlayColor={colors.touching}
      onPress={() => handlePress(iconColor)}>
      <View style={styles.item}>

      {/* //?Border radius 8 for square and 50 for ellipse */}
        <View style={[styles.iconPartWrapper, ]}>
          <View style={[styles.iconBackground, {backgroundColor: iconColor, borderRadius: 50}]}>
            <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons size={20}  color={'white'} name='list' />
            </View>
          </View>
        </View>

        <View style={[styles.mainPartWrapper, isLast && {borderBottomWidth: 1, borderBottomColor: colors.divider}]}>
          <View style={styles.mainPart}>
            <Text style={[styles.taskTitleText, {color: colors.text,fontWeight: text.startsWith('*') ? 'bold' : 'normal'}]}>
              {text}
            </Text>
            <View style={styles.helperPart}>
              {/* <Text style={[{color: colors.helperText}, styles.helperText]}>{list.order}</Text> */}
              <Ionicons name='chevron-forward' size={20} color={colors.helperIcon}/>
            </View>
          </View>
        </View>
      </View>

    </TouchableHighlight>

  )
}

const styles = StyleSheet.create({
  item: {
    // backgroundColor: 'red'
    // borderWidth: 1,
    // borderColor: 'red',

    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // paddingVertical: 8,
  },
  taskTitleText: {
    fontSize: 17,

  },
  mainPartWrapper: {
    // flex: 17,
    // backgroundColor: 'green'
    // borderWidth: 1,
    // borderColor: 'green',
    flexGrow: 1,
    paddingRight: 12,
    marginLeft: 12
  },
  mainPart: {
    // backgroundColor: 'blue'
    // borderWidth: 1,
    // borderColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16
    // width: '100%'

  },
  iconPartWrapper: {
    // flex: 2.6,
    // backgroundColor: 'yellow'
    // borderWidth: 1,
    // borderColor: 'yellow',
    marginLeft: 12,
  },
  iconBackground: {
    height: 32,
    width: 32
  },

  helperPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperText: {
    paddingRight: 6,
    fontSize: 17
  }
})

export default TodolistItem