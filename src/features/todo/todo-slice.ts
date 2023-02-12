import { todoAPI } from './../../api/todo-api';
import { SetTasksPayloadType } from "./../../types/common"
import { TodoType, UpdateTaskModel } from "../../types/common"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { batch } from "react-redux"
import { createListSetting, initializeCloudSettings, setSelectedListId } from '../settings/settings-slice';

interface TodoStateType {
  todoData: Array<TodoType> | []
  isTodolistsFetching: boolean
  error: string

  totalCount: number
}

const initialState: TodoStateType = {
  todoData: [],
  isTodolistsFetching: false,
  error: "",

  totalCount: 0,
}

//*REDUCER
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //*That shit makes action creaters by itself (also it's immutable)
    setTodolistsFetching(state, action: PayloadAction<boolean>) {
      state.isTodolistsFetching = action.payload
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },

    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload
    },

    setTodolists(state, action: PayloadAction<Array<TodoType> | []>) {
      state.todoData = action.payload
      state.totalCount = action.payload.length
    },

    setTasks(state, action: PayloadAction<SetTasksPayloadType>) {
      for (let i = 0; i < state.todoData.length; i++) {
        if (state.todoData[i].id === action.payload.listId) {
          state.todoData[i].tasks = action.payload.items
          state.todoData[i].totalCount = action.payload.totalCount
        }
      }
    },

    renameList(state, action: PayloadAction<{title:string, todolistId: string}>) {
      for (let i = 0; i < state.todoData.length; i++) {
        if(state.todoData[i].id === action.payload.todolistId) state.todoData[i].title = action.payload.title
        console.log('uebok')
      }
    }
  },
})

export const {
  setTodolistsFetching,
  setError,
  setTodolists,
  setTotalCount,
  setTasks,
  renameList,
} = todoSlice.actions

//*THUNKS

export const getTodos = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setTodolistsFetching(true))
    try {
      let response = await todoAPI.getTodolists()
      console.log('EBSAL:', response)
      let settingsList: TodoType

      let isSettingsListExist = false

      console.log(getState().settings.cloud.isLoaded)
      if(!getState().settings.cloud.isLoaded) {
      response.map( (list) => {
        if(list.title === 'SETTINGS'){ 
            isSettingsListExist = true
            dispatch(initializeCloudSettings(list))
          }
        
          

      })
      console.log('isSettingsListExist: ',isSettingsListExist)
      if(!isSettingsListExist) {
        const response = await todoAPI.todolistCreate('SETTINGS')
        await dispatch(initializeCloudSettings(response.data.item))
        await dispatch(createTodolist('Reminders', 'list', '#ff9f0a'))
      }
      }

      // if(isSettingsListExist)
       batch(() => {
        dispatch(setTodolists(response))
        response.map((list) => {
          list.title !== 'SETTINGS' && dispatch(getTasks(list.id))
        })
        dispatch(setTodolistsFetching(false))
      })
    } catch (e: any) {
      console.log(e)
      dispatch(setError(e.toString()))
    }
  }
}

export const getTasks = (listId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await todoAPI.getTasks(listId)
      dispatch(setTasks({ ...response, listId }))
    } catch (e: any) {
      console.log(e)
    }
  }
}

export const changeTask = (listId: string, taskId: string, updatedTask: UpdateTaskModel) => {
  return async (dispatch: AppDispatch) => {
    try{
      const response = await todoAPI.taskChange(listId, taskId, updatedTask)
    } catch (e: any) {
      console.log(e)
    }
  }
}

export const deleteTask = (listId: string, taskId: string) => {
  return async (dispatch: AppDispatch) => {
    try{
      const response = await todoAPI.removeTask(listId, taskId)
    } catch(e: any) {
      console.log(e)
    }
  }
}

export const createTask = (listId: string, title: string, description?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await todoAPI.createTask(title, listId)
      if(!description)return response.data
      else {
        const resp = await todoAPI.taskChange(listId, response.data.item.id, {...response.data.item, description: description})
        return resp
      }
    }
    catch (e: any) {
      console.log(e)
    }
  }
}

export const createTodolist = (title: string, iconName?: string, accentColor?: string) => {
  console.log(title, accentColor, iconName)
  return async (dispatch: AppDispatch) => {
    console.log(iconName, accentColor)
    await todoAPI.todolistCreate(title).then((data) => {
      //! fix types
      if(iconName && accentColor) {
      dispatch(createListSetting(data.data.item.id, iconName, accentColor)).then(() => {
        dispatch(getTodos())
        
        
      })
    }
    })
    
  }
}

export const deleteTodolist = (listId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    todoAPI.todolistDelete(listId).then(() => {
      dispatch(getTodos())
      //@ts-ignore
      let settingTask: SettingType = undefined

      //!automatize and delete later 
      if(listId === getState().settings.local.selectedList.id) dispatch(setSelectedListId({id: '', title: ''}))
      //

      getState().settings.cloud.settings.map((s) => {
        console.log(s.title, listId)
        if(s.title === listId) {
          console.log(s)
          settingTask = s
        }
      })

      dispatch(deleteTask(getState().settings.cloud.settingsListId, settingTask.id))
    })
  }
}

export const renameTodolist = (title: string, listId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    //!automatize and delete later 
    if(listId === getState().settings.local.selectedList.id) dispatch(setSelectedListId({id: listId, title}))
    //
    
    dispatch(renameList({title, todolistId: listId}))
    await todoAPI.todolistRename(title, listId)
  }
}

//*

export default todoSlice.reducer
