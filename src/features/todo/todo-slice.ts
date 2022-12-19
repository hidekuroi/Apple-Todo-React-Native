import { TodoType } from '../../types/common';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import { todoAPI } from '../../api/todo-api';

interface TodoStateType {
    todoData: Array<TodoType> | [],
    isTodolistsFetching: boolean,
    error: string
    
    totalCount: number
}

const initialState: TodoStateType = {
    todoData: [],
    isTodolistsFetching: false,
    error: '',

    totalCount: 0
}


//*REDUCER
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //*That shit makes action creaters by itself (also it's immutable)
        setTodolistsFetching(state, action: PayloadAction<boolean>) {
            state.isTodolistsFetching = action.payload
        },

        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },

        addTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = state.totalCount + action.payload;
        },

        setTodolists(state, action: PayloadAction<Array<TodoType> | []>) {
            state.todoData = action.payload
        }
    }
})

export const { setTodolistsFetching, setError, setTodolists } = todoSlice.actions

//*THUNKS

export const getTodos = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setTodolistsFetching(true))
        try{
            const response = await todoAPI.getTodolists()
                dispatch(setTodolists(response))
                dispatch(setTodolistsFetching(false))
        }
        catch(e: any) {
            console.log(e)
            dispatch(setError(e.toString()))
        }
                
    }
}

//*

export default todoSlice.reducer
