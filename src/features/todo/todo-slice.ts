import { todoAPI } from './../../api/todo-api';
import { SetTasksPayloadType } from "./../../types/common"
import { TodoType, UpdateTaskModel } from "../../types/common"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch } from "../../app/store"
import { batch } from "react-redux"

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
  return async (dispatch: AppDispatch) => {
    dispatch(setTodolistsFetching(true))
    try {
      const response = await todoAPI.getTodolists()
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

//*

export default todoSlice.reducer
