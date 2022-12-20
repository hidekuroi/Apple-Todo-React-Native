import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, RefreshControl, ActivityIndicator, Platform, Button, ActionSheetIOS, Alert } from 'react-native'
import { todoAPI } from '../api/todo-api'
import { getTodos, setError } from '../features/todo/todo-slice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useMyTheme } from '../hooks/useMyTheme'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { TasksType } from '../types/common'

type ListPropsType = {
    list: any
}

//@ts-ignore
const List: FC = (props) => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors, dark } = useMyTheme();
  const tabBarHeight = useBottomTabBarHeight()
  //@ts-ignore
  const list = props.route.params
  const [tasks, setTasks] = useState<any>([]) 
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const totalCount = useTypedSelector(state=>state.todo.totalCount)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchTasks()
    //@ts-ignore
    props.navigation.setOptions(
      {
        title: list.title, 
        headerLargeTitleStyle: {
          color: list.color
        },
        headerRight: () => <Button title="Edit" color={colors.primary} onPress={menuHandler}/>
        // headerTintColor: list.color
      })
      
  }, [])

  useEffect(() => {
  }, [totalCount])

  const deleteList = () => {
    todoAPI.todolistDelete(list.id).then(() => {
      dispatch(getTodos()).then(() => {
        props.navigation.goBack()
      })
    })
  }

  const menuHandler = () => {
    if(Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        title: `Edit "${list.title}"`,
        options: ["Cancel", "Delete list"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: (dark ? 'dark' : 'light')
      }, buttonIndex => {
        if (buttonIndex === 0) {
          console.log('cancel')
        }
        else {
          // todoAPI.todolistDelete(list.id).then(() => {
          //   props.navigation.goBack()
          // })
          Alert.alert(`Delete "${list.title}"`, "Are you sure you want to delete this list?", [{text: "Cancel", style: 'cancel'}, {text: "Delete", style: 'destructive', onPress: deleteList}], {userInterfaceStyle: dark ? 'dark' : 'light'})
        }
      })
    }
  }

  


  const fetchTasks = async () => {
    todoAPI.getTasks(list.id).then(data => {
        if(data.items.length)setTasks(data.items)
        else setError('タスクがありません')
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
          <>
          {!error.length ? <View style={{marginTop: 12}}>
              <ActivityIndicator />
            </View> 
            : 
            <View>
              <Text style={{color: colors.disabledText}}>{error}</Text>
            </View>
            }
            
          </>
        }
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    })

export default List