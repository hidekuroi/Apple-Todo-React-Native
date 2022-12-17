import { Ionicons } from '@expo/vector-icons'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, Text, Button, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'
import { todoAPI } from '../api/todo-api'
import TodolistItem from '../components/TodolistItem'
import { RootStackParamList } from '../types/navigation-types'

const Todos: FC = () => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { colors } = useTheme();
  const bottomBarHeight = useBottomTabBarHeight()

  const [todolists, setTodolists] = useState<any>([])
  
  const [show, setShow] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    getLists()

    navigation.setOptions({
      headerRight: () => <View>
        <TouchableOpacity onPress={() => navigation.navigate("CreateNewListModal")}><Ionicons name='add' color={colors.primary} size={32}/></TouchableOpacity>
      </View>
    })
  }, [])


  const getLists = async () => {
    todoAPI.getTodolists().then(data => setTodolists(data))
  }


  const handlePress = (list: any, color = colors.text) => {
    navigation.navigate('List', {...list, color})
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
        <View style={[styles.wrapper, {marginTop: 0, marginBottom: bottomBarHeight*2}]}>
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
    width: Platform.OS === 'ios' ? '91.5%' : '100%',
    borderRadius: 11
  }
})

export default Todos