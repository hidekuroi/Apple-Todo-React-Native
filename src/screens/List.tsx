import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, RefreshControl, ActivityIndicator, Platform } from 'react-native'
import { todoAPI } from '../api/todo-api'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useMyTheme } from '../hooks/useMyTheme'
import { TasksType } from '../types/common'

type ListPropsType = {
    list: any
}

//@ts-ignore
const List: FC = (props) => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors } = useMyTheme();
  const dispatch = useAppDispatch()
  const tabBarHeight = useBottomTabBarHeight()
  //@ts-ignore
  const list = props.route.params
  const [tasks, setTasks] = useState<any>([]) 
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    fetchTasks()
    //@ts-ignore
    props.navigation.setOptions(
      {
        title: list.title, 
        headerLargeTitleStyle: {
          color: list.color
        },
        // headerTintColor: list.color
      })
  }, [])

  const fetchTasks = async () => {
    todoAPI.getTasks(list.id).then(data => {
        setTasks(data.items)
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchTasks().then(() => {
       setRefreshing(false)
    })
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
    }>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {tasks.length > 0 ? <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: tabBarHeight, backgroundColor: colors.background, width: '100%'}}>
            {tasks[0]?.todoListId === list.id && tasks.map((task: TasksType, index: number) => <View key={task.id} style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.divider, width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16}}>
                  <Text style={{fontWeight: 'bold', color: colors.text}}>{`${index + 1}. `}</Text>
                  <Text style={{color: colors.text, textDecorationLine: task.status ? 'line-through' : 'none'}}>{`${task.title}`}</Text>
                </View>
              </View>)}
          </View>

          :
          <View style={{marginTop: 12}}>
            <ActivityIndicator />
          </View>
        }
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    })

export default List