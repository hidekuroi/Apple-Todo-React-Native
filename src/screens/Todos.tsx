import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import { todoAPI } from '../api/todo-api'
import { TasksType } from '../types/common'

const Todos: FC = () => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors } = useTheme();

  const [todolists, setTodolists] = useState<any>([])
  const [tasks, setTasks] = useState<any>([])
  const [show, setShow] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    getLists()
  }, [])

  useEffect(() => {
  }, [tasks])

  const getLists = async () => {
    todoAPI.getTodolists().then(data => setTodolists(data))
  }

  const getTasks = async (id: string) => {
    todoAPI.getTasks(id).then(data => {
        setTasks(data.items)
        setShow(true)
    })
  }

  const handlePress = (id: string) => {
    if(id !== tasks[0]?.todoListId) {
        getTasks(id)
    }
    else {
        setShow(!show)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getLists().then(() => {
        if(tasks.length > 0) {
            getTasks(tasks[0].todoListId).then(() => {
                setRefreshing(false)
            })
        }
        else setRefreshing(false)
    })
  }, [])
  
  return (
    <ScrollView endFillColor={'red'} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Todos</Text>
            {todolists.map((list:any) => {
                return(
                <View style={{display: 'flex', paddingHorizontal: 45}}>
                    <Text onPress={() => handlePress(list.id)} style={{fontSize: 20, color: colors.text, fontWeight: list.title.startsWith('*') ? 'bold' : 'normal'}}>{list.title}</Text>
                    {tasks[0]?.todoListId === list.id && show && tasks.map((task: TasksType, index: number) => <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Text style={{fontWeight: 'bold', color: colors.text}}>{`${index + 1}. `}</Text>
                        <Text style={{color: colors.text, textDecorationLine: task.status ? 'line-through' : 'none'}}>{`${task.title}`}</Text>
                    </View>)}
                </View>
                )
            })}
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    })

export default Todos