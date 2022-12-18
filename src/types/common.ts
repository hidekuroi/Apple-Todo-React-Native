import { IsAuthResponseType } from './../api/auth-api';
export type FormType = {
    email: string,
    password: string
}

export type FullIsAuthResponseType = IsAuthResponseType & {
    isAuth: boolean
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



//?SOCIAL NETWORK API TYPES

export type PhotosType = {
    small: string | 'https://vk.com/sticker/1-64142-512',
    large: string | 'https://vk.com/sticker/1-64142-512'
}
export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null,
}
export type UserPageType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}

//?\\