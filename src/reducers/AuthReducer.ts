import { AuthAcNameTypes, AuthAction } from '../types/authRedTypes';
import { AuthState } from "../types/authRedTypes";

const initialState: AuthState = {
    email: '',
    login: '',

    isAuth: false
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch(action.type) {
        
        case AuthAcNameTypes.SET_AUTH_USER:
            return {...state, email: action.payload.email, login: action.payload.login, isAuth: true}

        default:
            return state
    }
}

//*ACTION CREATORS

export const setAuthUser = (email: string, login: string): AuthAction => {
    return {type: AuthAcNameTypes.SET_AUTH_USER, payload: {email, login}}
}