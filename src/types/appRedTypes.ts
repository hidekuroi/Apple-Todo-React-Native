export type AppState = {
    isInitilized: boolean
}

export enum AppAcNameTypes {
    SET_INITILIZED = 'SET-AUTH-USER'
}

interface SetInitilizedAction {
    type: AppAcNameTypes.SET_INITILIZED,
    payload: {isInitilized: boolean}
}

export type AppAction = SetInitilizedAction