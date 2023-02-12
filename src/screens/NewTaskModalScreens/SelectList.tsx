import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC, useEffect, useState } from "react"
import { Button, ScrollView, StyleSheet, Text, View } from "react-native"
import Card from "../../components/Card"
import TodolistItem from "../../components/TodolistItem"
import { setSelectedListId } from "../../features/settings/settings-slice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useLocale } from "../../hooks/useLocale"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { TasksType, TodoType } from "../../types/common"
import { TaskInfoParamList } from "../../types/navigation-types"

type SelectListModalProps = NativeStackScreenProps<
  TaskInfoParamList,
  "SelectList"
>
//! Optimize later
const SelectList: FC<SelectListModalProps> = ({ navigation, route }) => {
  const todoData = route.params.todoData
  const cloudSettings = route.params.cloudSettings
  const isEditTask = route.params.isEditTask
  const localSettings = useTypedSelector((state) => {
    return state.settings.local
  })
  const { colors, dark } = useMyTheme()
  const dispatch = useAppDispatch()
  const i18n = useLocale()
  const [isFlagged, setIsFlagged] = useState<boolean>(false)

  useEffect(() => {
    //? does not work properly with native stack navigation
    // navigation.addListener('beforeRemove', (e) => {e.preventDefault()})
    navigation.setOptions({
      title: i18n.t('list'),
    })
  }, [])

  const handlePress = (list: TodoType) => {
    dispatch(setSelectedListId({ id: list.id, title: list.title }))
    navigation.goBack()
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: dark ? colors.modalBackground : colors.modalCard,
      }}
    >
      <View
        style={{ justifyContent: "center", alignItems: "center", marginTop: 7 }}
      >
        <View style={{ marginBottom: 12 }}>
          {!isEditTask && <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: colors.text,
              paddingHorizontal: "12%",
              textAlign: "center",
            }}
          >{`${i18n.t('selectListHeader')} "${
            localSettings.selectedList.id
              ? localSettings.selectedList.title
              : todoData[0].title
          }" ${i18n.locale === 'ja' ? i18n.t('selectListHeaderJA') : ''}`}</Text>}
        </View>
        {todoData?.length && (
          <View style={[styles.list, { backgroundColor: colors.card }]}>
            <>
              {console.log("REAL RENDER")}
              {todoData?.map((list: TodoType, index: number) => {
                //@ts-ignore
                let listSettings: any = []
                cloudSettings.map((s: TasksType) => {
                  if (s.title === list.id) {
                    let temp = s.description.split(";")
                    temp.map((i) => {
                      const splitted = i.split("=")
                      listSettings[splitted[0]] = splitted[1]
                    })
                  }
                })
                return (
                  <View
                    key={list.id}
                    style={{
                      display: list.title === "SETTINGS" ? "none" : "flex",
                    }}
                  >
                    <TodolistItem
                      isModal
                      isSquare={localSettings.isSquareIcons}
                      text={list.title}
                      handlePress={() => handlePress(list)}
                      isLast={index + 1 !== todoData.length}
                      accentColor={listSettings?.accentColor}
                      iconName={listSettings?.iconName}
                      isSelected={
                        localSettings.selectedList.id
                          ? list.id === localSettings.selectedList.id
                          : index === 0
                      }
                      // isSquare={localSettings.isSquareIcons}
                    />
                  </View>
                )
              })}
            </>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
})

export default SelectList
