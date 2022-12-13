export interface TodoState {
    tasks: any[],
}

export enum TodoAcNameTypes {
    SET_TASKS = 'SET-TASKS'
}

interface SetTasks {
    type: TodoAcNameTypes.SET_TASKS,
    payload: any[]
}

export type TodoAction = SetTasks