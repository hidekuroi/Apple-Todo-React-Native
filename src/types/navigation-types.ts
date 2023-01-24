import { TodoType } from "./common"
import { NavigatorScreenParams } from "@react-navigation/native"

export type RootStackParamList = {
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>
  List: {
    list: TodoType
    color: string
    settings?: {
      iconNameValue: string,
      colorValue: string
    }
  }
  Auth: undefined
  Loading: undefined
  CreateNewListModal: {
    iconNameValue?: string,
    colorValue?: string,
    todolistId?: string,
    title?: string
  }
}

export type MainTabParamList = {
  TodoStackNavigator: NavigatorScreenParams<TodoStackParamList>
  SettingsStackNavigator: NavigatorScreenParams<SettingsStackParamList>
}

export type TodoStackParamList = {
  Todos: undefined
  
  // List: {
  //   list: TodoType
  //   color: string
  // }
}

export type SettingsStackParamList = {
  Settings: undefined
  About: undefined
  Appearence: undefined
  Profile: undefined
  TodoSettings: undefined
}
