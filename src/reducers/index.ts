import { todoReducer } from './TodoReducer';
import { authReducer } from './AuthReducer';
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"

export const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>