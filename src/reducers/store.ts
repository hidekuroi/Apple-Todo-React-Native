import { todoReducer } from './TodoReducer';
import { authReducer } from './AuthReducer';
import { applyMiddleware, combineReducers, createStore } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"

export const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))


export const store = configureStore(
    {
        reducer: rootReducer,
//        middleware: thunk
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
