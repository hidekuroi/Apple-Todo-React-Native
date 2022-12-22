import { FormType, FullIsAuthResponseType } from "./../../types/common"
import { authAPI } from "./../../api/auth-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
// import { createAsyncThunk } from '@reduxjs/toolkit';

interface AuthStateType {
  id: number
  email: string
  login: string

  isAuth: boolean
  isFetching: boolean
}

const initialState: AuthStateType = {
  id: 0,
  email: "",
  login: "",

  isAuth: false,
  isFetching: false,
}

//*REDUCER
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUserSetted(state, action: PayloadAction<FullIsAuthResponseType>) {
      state.id = action.payload.id
      state.email = action.payload.email
      state.login = action.payload.login
      state.isAuth = action.payload.isAuth
    },

    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload
    },
  },
  //*Async Thunk reducer
  // extraReducers: builder => {
  //     builder
  //         .addCase(authCheck.pending, (state, action) => {
  //             console.log('pending')
  //         })
  //         .addCase(authCheck.fulfilled, (state, action) => {
  //             state.id = action.payload.data.id;
  //             state.email = action.payload.data.email;
  //             state.login = action.payload.data.login;
  //             state.isAuth = action.payload.resultCode === 0 ? true : false
  //         })
  // }
})
//*

//*ACTIONS

export const { authUserSetted, setIsFetching } = authSlice.actions

//*

//*THUNKS
//?DECIDE IF AM I NEED TO DO IT WITH createAsyncThunk
// export const authCheck = createAsyncThunk('auth/authCheck', async (asmd = undefined, thunkAPI) => {
//     const response = await authAPI.isAuth()
//     if(response.data.resultCode === 0) {
//         thunkAPI.dispatch(authUserSetted(response.data.data))
//     }
//     return response.data
// })

export const authCheck = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await authAPI.isAuth()

    if (response.data.resultCode === 0)
      dispatch(authUserSetted({ ...response.data.data, isAuth: true }))
    else
      dispatch(authUserSetted({ email: "", id: 0, isAuth: false, login: "" }))

    if (getState().auth.isFetching === true) dispatch(setIsFetching(false))
  }
}

export const signIn = (form: FormType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsFetching(true))
    const response = await authAPI.login(form)
    if (response.resultCode === 0) dispatch(authCheck())
    else dispatch(setIsFetching(false))
  }
}

export const signOut = () => {
  return async (dispatch: AppDispatch) => {
    await authAPI.logout().then(() => dispatch(authCheck()))
  }
}

//*

export default authSlice.reducer
