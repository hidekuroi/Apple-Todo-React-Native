import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native'
import { todoAPI } from '../api/todo-api'
import TodolistItem from '../components/TodolistItem'

//@ts-ignore
const Todos: FC = ({navigation}) => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors } = useTheme();

  const [todolists, setTodolists] = useState<any>([])
  
  const [show, setShow] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    getLists()
  }, [])


  const getLists = async () => {
    todoAPI.getTodolists().then(data => setTodolists(data))
  }


  const handlePress = (list: any) => {
    navigation.navigate('List', list)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getLists().then(() => {
       setRefreshing(false)
    })
  }, [])
  
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' endFillColor={'red'} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={[styles.wrapper, {marginTop: 12}]}>
          <View style={[styles.list, {backgroundColor: colors.card}]}>
            {todolists.map((list:any, index: number) => 
            <View key={list.id}>
              <TodolistItem list={list} handlePress={handlePress} isEven={index + 1 !== todolists.length}/>
            </View>
            )}
          </View>
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  list: {
    width: '90%',
    borderRadius: 12
  }
})

export default Todos