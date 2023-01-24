import { TasksType } from "./common"

export interface CloudSettingsType {
    settingsListId: string,
    settingsListTitle: string,
    settings: TasksType[] | [],
    isLoaded: boolean
}