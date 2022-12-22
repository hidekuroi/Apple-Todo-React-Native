import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { authCheck } from "../auth/auth-slice"

interface AppStateType {
  isInitialized: boolean
}

const initialState: AppStateType = {
  isInitialized: false,
}

//*REDUCER
const appstateSlice = createSlice({
  name: "todo",
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
      // if(getState().auth.isAuth) {
      //     await dispatch(getTodos()).then((data) => {
      //         // console.log(data)
      //         setIsInitialized(true)
      //     })
      // }
      // else {
      dispatch(setIsInitialized(true))
      // }
    })
  }
}

//*

export default appstateSlice.reducer
