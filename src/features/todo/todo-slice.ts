import { TodoType } from '../../types/common';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import { todoAPI } from '../../api/todo-api';
import { batch } from 'react-redux';

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

        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload;
        },

        setTodolists(state, action: PayloadAction<Array<TodoType> | []>) {
            state.todoData = action.payload
            state.totalCount = action.payload.length
        }
    }
})

export const { setTodolistsFetching, setError, setTodolists, setTotalCount } = todoSlice.actions

//*THUNKS

export const getTodos = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(setTodolistsFetching(true))
        try{
            const response = await todoAPI.getTodolists()
            batch(() => {
                dispatch(setTodolists(response))

                dispatch(setTodolistsFetching(false))
                    
            })
                
        }
        catch(e: any) {
            console.log(e)
            dispatch(setError(e.toString()))
        }
                
    }
}

//*

export default todoSlice.reducer
