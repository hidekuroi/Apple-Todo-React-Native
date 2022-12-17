import { TodoType } from '../../types/common';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';

interface TodoStateType {
    todoData: Array<TodoType> | [],
    isFetching: boolean,
    
    totalCount: number
}

const initialState: TodoStateType = {
    todoData: [],
    isFetching: false,

    totalCount: 0
}


//*REDUCER
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //*That shit makes action creaters by itself (also it's immutable)
        toggleIsFetching(state) {
            !state.isFetching;
        },

        addTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = state.totalCount + action.payload;
        }
    }
})

export const { toggleIsFetching } = todoSlice.actions

export default todoSlice.reducer
