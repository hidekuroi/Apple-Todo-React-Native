import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC } from 'react'
import { View, StyleSheet, Text, ScrollView, Button, Alert, ActionSheetIOS, Platform, TouchableHighlight } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'
// import { signOut } from '../reducers/AuthReducer'
import { signOut } from '../features/auth/auth-slice'
import { useMyTheme } from '../hooks/useMyTheme'

const Settings: FC = () => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors, dark } = useMyTheme();
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

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
    // navigation.navigate('Todos')
  }  

  const btnHandler = () => {
    if(Platform.OS === 'ios') {
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
    else {
      signOutHandler()
    }
  }
  
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' endFillColor={'red'}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.list, {backgroundColor: colors.card}]}>

            <View style={styles.listItem}>
              {/* <TouchableHighlight activeOpacity={1} underlayColor={colors.touching} onPress={() => alert("TodoHide Native 0.1.1")}> */}
                <Button title='About alert' onPress={() => alert("TodoHide Native 0.1.1")}/>
              {/* </TouchableHighlight> */}
            </View>

          </View>
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
    width: '91.5%',
    borderRadius: 11,
    marginBottom: 36
  },
  listItem: {
    fontSize: 17,
    paddingVertical: 5
  }
})

export default Settings