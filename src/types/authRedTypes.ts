export interface AuthState {
    id: number,
    email: string,
    login: string,

    isAuth: boolean,
}

export enum AuthAcNameTypes {
    SET_AUTH_USER = 'SET-AUTH-USER'
}

interface SetAuthUserAction {
    type: AuthAcNameTypes.SET_AUTH_USER,
    payload: {login: string, email: string, isAuth: boolean}
}

export type AuthAction = SetAuthUserAction