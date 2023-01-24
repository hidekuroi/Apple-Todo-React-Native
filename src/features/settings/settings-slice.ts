import { CloudSettingsType } from "./../../types/main-types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { TasksType, TodoType, UpdateTaskModel } from "../../types/common"
import { todoAPI } from "../../api/todo-api"
import {
  changeTask,
  createTask,
  getTodos,
  renameTodolist,
} from "../todo/todo-slice"
import { batch } from "react-redux"

interface SettingsStateType {
  cloud: CloudSettingsType
  local: {
    isSettingsListVisible: boolean,
    isSquareIcons: boolean
  }
}

const initialState: SettingsStateType = {
  cloud: {
    settingsListId: "",
    settingsListTitle: "",
    settings: [],
    isLoaded: false,
  },
  local: {
    isSettingsListVisible: false,
    isSquareIcons: false
  },
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

      let settings: TasksType[] = []
      if (action.payload.tasks.length) {
        for (let i = 0; i < action.payload.tasks.length; i++) {
          settings.push(action.payload.tasks[i])
        }
      }
      state.cloud.settings = settings

      state.cloud.isLoaded = true
    },
    setSettings(state, action: PayloadAction<TasksType[]>) {
      let settings: TasksType[] = []
      if (action.payload.length) {
        for (let i = 0; i < action.payload.length; i++) {
          settings.push(action.payload[i])
        }
      }
      state.cloud.settings = settings
    },
    clearSettings(state) {
      state.cloud.settings = []
      state.cloud.settingsListId = ""
      state.cloud.settingsListTitle = ""
      state.cloud.isLoaded = false

      state.local.isSettingsListVisible = false
    },
    editSetting(
      state,
      action: PayloadAction<{ name: string; description: string }>
    ) {
      for (let i = 0; i < state.cloud.settings.length; i++) {
        if (state.cloud.settings[i].title === action.payload.name)
          state.cloud.settings[i].description = action.payload.description
      }
    },
    editLocalSetting(state, action: PayloadAction<{settingName: string, settingValue: any}>) {
      switch (action.payload.settingName) {
        case 'isSettingsListVisible':
          state.local.isSettingsListVisible = action.payload.settingValue
          break;

        case 'isSquareIcons':
          state.local.isSquareIcons = action.payload.settingValue
          break;
      
        default:
          break;
      }
    }
  },
})

export const {
  setInitializedSettingsList,
  setSettings,
  clearSettings,
  editSetting,
  editLocalSetting
} = settingsSlice.actions

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

      await dispatch(
        changeTask(settingsListId, settingTask.item.id, updatedSettingTask)
      )
      await dispatch(getSettings())
      dispatch(getTodos())
    }
  }
}

export const editListSetting = (
  todolistId: string,
  iconName: string,
  accentColor: string,
  title?: string
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let updatedSettingTask: TasksType | null = null
    getState().settings.cloud.settings.map((s: TasksType) => {
      if (s.title === todolistId) {
        updatedSettingTask = {
          //@ts-ignore
          ...s,
          description: `iconName=${iconName};accentColor=${accentColor}`,
        }
      }
    })
    if (updatedSettingTask) {
      await dispatch(
        changeTask(
          //@ts-ignore
          updatedSettingTask.todoListId,
          //@ts-ignore
          updatedSettingTask.id,
          updatedSettingTask
        )
      )
      if (title) {
        batch(() => {
          dispatch(renameTodolist(title, todolistId))
          dispatch(
            editSetting({
              name: todolistId,
              //@ts-ignore
              description: updatedSettingTask.description,
            })
          )
        })
      } else {
        dispatch(
          editSetting({
            name: todolistId,
            //@ts-ignore
            description: updatedSettingTask.description,
          })
        )
      }

      // dispatch(getTodos())
    }
  }
}

//*

export default settingsSlice.reducer
