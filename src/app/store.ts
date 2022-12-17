import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todo-slice";
import authReducer from "../features/auth/auth-slice"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;