import { AppAction, AppState, AppAcNameTypes } from './../types/appRedTypes';
import { Dispatch } from 'redux';
import { authCheck } from './AuthReducer';

const initialState: AppState = {
    isInitilized: false
}

export const appReducer = (state = initialState, action: AppAction): AppState => {
    switch(action.type) {
        
        case AppAcNameTypes.SET_INITILIZED:
            return {...state, isInitilized: action.payload.isInitilized}

        default:
            return state
    }
}

//*ACTION CREATORS

export const setInitialized = (isInitilized: boolean):AppAction => {
    return {type: AppAcNameTypes.SET_INITILIZED, payload: {isInitilized}}
}


export const initilizeApp = () => {
    return async (dispatch: Dispatch<AppAction> | any) => {
        let promises = [dispatch(authCheck())];
        console.log(promises)
        Promise.all(promises)
        .then(() => {
            console.log(promises)
            dispatch(setInitialized(true));
        });
    }
}