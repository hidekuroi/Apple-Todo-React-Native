import { CloudSettingsType, SettingType } from "./../../types/main-types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { TasksType, TodoType, UpdateTaskModel } from "../../types/common"
import { todoAPI } from "../../api/todo-api"
import { changeTask, createTask, getTodos } from "../todo/todo-slice"

interface SettingsStateType {
  cloud: CloudSettingsType
  local: null
}

const initialState: SettingsStateType = {
  cloud: {
    settingsListId: "",
    settingsListTitle: "",
    settings: [],
    isLoaded: false,
  },
  local: null,
}

//*REDUCER
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInitializedSettingsList(state, action: PayloadAction<TodoType>) {
      console.log(action)
      state.cloud.settingsListId = action.payload.id
      state.cloud.settingsListTitle = action.payload.title

      let settings: SettingType[] = []
      if (action.payload.tasks.length) {
        for (let i = 0; i < action.payload.tasks.length; i++) {
          settings.push({
            description: action.payload.tasks[i].description,
            id: action.payload.tasks[i].id,
            status: action.payload.tasks[i].status,
            title: action.payload.tasks[i].title,
          })
        }
      }
      state.cloud.settings = settings

      state.cloud.isLoaded = true
    },
    setSettings(state, action: PayloadAction<TasksType[]>) {
      let settings: SettingType[] = []
      if (action.payload.length) {
        for (let i = 0; i < action.payload.length; i++) {
          settings.push({
            description: action.payload[i].description,
            id: action.payload[i].id,
            status: action.payload[i].status,
            title: action.payload[i].title,
          })
        }
      }
      state.cloud.settings = settings
    },
    clearSettings(state) {
      state.cloud.settings = []
      state.cloud.settingsListId = ''
      state.cloud.settingsListTitle = ''
      state.cloud.isLoaded = false
    }
  },
})

export const { setInitializedSettingsList, setSettings, clearSettings } = settingsSlice.actions

//*THUNKS

export const initializeCloudSettings = (settingsList: TodoType) => {
  return async (dispatch: AppDispatch) => {
    const response = await todoAPI.getTasks(settingsList.id)
    let settingsListWithTasks = {
      ...settingsList,
      tasks: response.items,
    }
    dispatch(setInitializedSettingsList(settingsListWithTasks))
  }
}

export const getSettings = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const id = getState().settings.cloud.settingsListId
    const response = await todoAPI.getTasks(id)

    dispatch(setSettings(response.items))
  }
}

export const createListSetting = (
  title: string,
  iconName: string,
  accentColor: string
) => {
  console.log(title)
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const settingsListId = getState().settings.cloud.settingsListId
    const settingTask = await dispatch(createTask(settingsListId, title))

    if (settingTask) {
      const updatedSettingTask: UpdateTaskModel = {
        ...settingTask.item,
        description: `iconName=${iconName};accentColor=${accentColor}`,
      }

      await dispatch(changeTask(settingsListId, settingTask.item.id, updatedSettingTask))
      await dispatch(getSettings())
      dispatch(getTodos())
    }
  }
}

//*

export default settingsSlice.reducer
