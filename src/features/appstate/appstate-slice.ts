import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { authCheck } from "../auth/auth-slice"
import { getTodos } from "../todo/todo-slice"

interface AppStateType {
  isInitialized: boolean
}

const initialState: AppStateType = {
  isInitialized: false,
}

//*REDUCER
const appstateSlice = createSlice({
  name: "appstate",
  initialState,
  reducers: {
    setIsInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    },
  },
})

export const { setIsInitialized } = appstateSlice.actions

//*THUNKS

export const initializeApp = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let promises = [dispatch(authCheck())]

    Promise.all(promises).then(async () => {
      if(getState().auth.isAuth) {
          dispatch(setIsInitialized(true))
      }
      else {
      dispatch(setIsInitialized(true))
      }
    })
  }
}

//*

export default appstateSlice.reducer
