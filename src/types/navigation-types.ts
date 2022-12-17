import { NavigatorScreenParams } from "@react-navigation/native"

export type RootStackParamList = {
    MainTabNavigator: NavigatorScreenParams<MainTabParamList>,
    Auth: undefined
}

export type MainTabParamList = {
    TodoStackNavigator: NavigatorScreenParams<TodoStackParamList>,
    SettingsStackNavigator: NavigatorScreenParams<SettingsStackParamList>
}

export type TodoStackParamList = {
    Todos: undefined,
    CreateNewListModal: undefined,
    List: {
        list: any
    },
}

export type SettingsStackParamList = {
    Settings: undefined
}
