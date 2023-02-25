import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "../features/todo/todo-slice"
import authReducer from "../features/auth/auth-slice"
import appstateReducer from "../features/appstate/appstate-slice"
import settingsReducer from "../features/settings/settings-slice"

export const store = configureStore({
  reducer: {
    appstate: appstateReducer,
    auth: authReducer,
    todo: todoReducer,
    settings: settingsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
