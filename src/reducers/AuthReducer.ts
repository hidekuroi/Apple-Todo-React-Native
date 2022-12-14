import { FormType } from './../types/common';
import { Dispatch } from 'redux';
import { authAPI } from '../api/auth-api';
import { AuthAcNameTypes, AuthAction } from '../types/authRedTypes';
import { AuthState } from "../types/authRedTypes";

const initialState: AuthState = {
    id: 0,
    email: '',
    login: '',

    isAuth: false,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch(action.type) {
        
        case AuthAcNameTypes.SET_AUTH_USER:
            return {...state, email: action.payload.email, login: action.payload.login, isAuth: action.payload.isAuth}

        default:
            return state
    }
}

//*ACTION CREATORS

export const setAuthUser = (email: string, login: string, isAuth: boolean): AuthAction => {
    return {type: AuthAcNameTypes.SET_AUTH_USER, payload: {email, login, isAuth}}
}

export const authCheck = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        let data = await authAPI.isAuth()
            if(data.data.resultCode === 0)dispatch(setAuthUser(data.data.data.email, data.data.data.login, true))
            else dispatch(setAuthUser('', '', false))
    }
}

export const signIn = (form: FormType) => {
    return async (dispatch: Dispatch<AuthAction> | any) => {
        let data = await authAPI.login(form)
            dispatch(authCheck())
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch<AuthAction> | any) => {
        let data = await authAPI.logout()
            dispatch(authCheck())
    }
}