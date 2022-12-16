import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'

type TodolistProps = {
  list: any,
  isEven: boolean,

  handlePress: (list: any) => void
}

const TodolistItem: FC<TodolistProps> = ({list, handlePress, isEven}) => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors } = useTheme()
  const dispatch = useAppDispatch()

  
  return (
    <TouchableHighlight activeOpacity={1} underlayColor={colors.touching} style={{}} onPress={() => handlePress(list)}>
      <View key={list.id} style={styles.item}>

        <View style={styles.iconPartWrapper}>
          <Ionicons name='list' color={colors.primary} size={21}/>
        </View>

        <View style={[styles.mainPartWrapper, isEven && {borderBottomWidth: 1, borderBottomColor: colors.divider}]}>
          <View style={styles.mainPart}>
            <Text style={[styles.taskTitleText, {color: colors.text,fontWeight: list.title.startsWith('*') ? 'bold' : 'normal'}]}>
              {list.title.toLowerCase()}
            </Text>
            <Ionicons name='chevron-forward' size={20} color={colors.helperIcon}/>
          </View>
        </View>
      </View>

    </TouchableHighlight>

  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingVertical: 10,
    // paddingHorizontal: 16
  },
  taskTitleText: {
    fontSize: 17,

  },
  mainPartWrapper: {
    flex: 17,
    flexDirection: 'row',
    paddingVertical: 12
  },
  mainPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    width: '100%'
  },
  iconPartWrapper: {
    flex: 2.6,
    paddingLeft: 16,
    alignItems: 'flex-start'
  }
})

export default TodolistItem