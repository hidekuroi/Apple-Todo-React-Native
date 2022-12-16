import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC } from 'react'
import { View, StyleSheet, Text, ScrollView, Button, Alert, ActionSheetIOS } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { signOut } from '../reducers/AuthReducer'

const Settings: FC = () => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors, dark } = useTheme();
  const dispatch = useAppDispatch()

  const TestAlert = () => 
  Alert.alert('Log Out', 'Are you sure you want to log out?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
        style: 'cancel'
      },
      {
        text: 'Log Out',
        onPress: () => signOutHandler(),
        style: 'destructive'
      },
    ], {cancelable: true}
  )

  const signOutHandler = () => {
    dispatch(signOut())
  }  

  const btnHandler = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      title: "Are you sure you want to log out?",
      options: ["Cancel", "Log Out"],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
      userInterfaceStyle: (dark ? 'dark' : 'light')
    }, buttonIndex => {
      if (buttonIndex === 0) {
        console.log('cancel')
      }
      else {
        signOutHandler()
      }
    })
  }
  
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' endFillColor={'red'}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 12}}>
          <View style={[styles.list, {backgroundColor: colors.card}]}>
            <View style={styles.listItem}>
              <Button title='Log Out' color={'red'} onPress={btnHandler} />
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    width: '90%',
    borderRadius: 12,
  },
  listItem: {
    fontSize: 17,
    paddingVertical: 5
  }
})

export default Settings