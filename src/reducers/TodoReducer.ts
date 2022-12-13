import { TodoAcNameTypes, TodoAction, TodoState } from "../types/todoRedTypes";

const initialState: TodoState = {
    tasks: []
}

export const todoReducer = (state = initialState, action: TodoAction): TodoState => {
    switch(action.type) {

        case TodoAcNameTypes.SET_TASKS:
            return {...state, tasks: action.payload}

        default:
            return state
    }
}