export type FormType = {
    email: string,
    password: string
}
//? Min task
export type UpdateTaskModel = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}
//? Full task
export type TasksType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}

export type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
    totalCount: number
    tasks: TasksType[] | []
}