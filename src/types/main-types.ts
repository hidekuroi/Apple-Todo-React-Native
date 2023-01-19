export interface SettingType {
  description: string
  title: string
  status: number
  id: string
}

export interface CloudSettingsType {
    settingsListId: string,
    settingsListTitle: string,
    settings: SettingType[] | [],
    isLoaded: boolean
}