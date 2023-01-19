import { SettingType } from './../../types/main-types';
import { todoAPI } from './../../api/todo-api';
import { SetTasksPayloadType } from "./../../types/common"
import { TodoType, UpdateTaskModel } from "../../types/common"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { batch } from "react-redux"
import { createListSetting, initializeCloudSettings } from '../settings/settings-slice';

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
  },
})

export const {
  setTodolistsFetching,
  setError,
  setTodolists,
  setTotalCount,
  setTasks,
} = todoSlice.actions

//*THUNKS

export const getTodos = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setTodolistsFetching(true))
    try {
      let response = await todoAPI.getTodolists()
      let settingsList: TodoType

      console.log(getState().settings.cloud.isLoaded)
      response.map(async (list) => {
        if(list.title === 'SETTINGS' && !getState().settings.cloud.isLoaded) await dispatch(initializeCloudSettings(list))
      })

      batch(() => {
        dispatch(setTodolists(response))

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

export const createTask = (listId: string, title: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await todoAPI.createTask(title, listId)
      return response.data
    }
    catch (e: any) {
      console.log(e)
    }
  }
}

export const createTodolist = (title: string, iconName: string, accentColor: string) => {
  console.log(title, accentColor, iconName)
  return async (dispatch: AppDispatch) => {
    console.log(iconName, accentColor)
    await todoAPI.todolistCreate(title).then((data) => {
      //! fix types
      dispatch(createListSetting(data.data.item.id, iconName, accentColor)).then(() => {
        
      })
    })
    
  }
}

export const deleteTodolist = (listId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    todoAPI.todolistDelete(listId).then(() => {
      dispatch(getTodos())
      //@ts-ignore
      let settingTask: SettingType = undefined

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

//*

export default todoSlice.reducer
