import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert, Text } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { authCheck, setAuthUser, signIn } from '../reducers/AuthReducer'

//@ts-ignore
const Auth: FC = ({ navigation }) => {

  const dispatch = useAppDispatch()
  const {colors} = useTheme()
  const {login, isAuth} = useTypedSelector(state => state.auth)

  const [error, setError] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

//   const TestAlert = () => 
//     Alert.alert('Signed Out', 'You have been signed out',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel pressed'),
//           style: 'destructive'
//         },
//         {
//           text: 'Ok',
//           onPress: () => console.log('Ok pressed'),
//           style: 'default'
//         },
//       ], {cancelable: true, userInterfaceStyle: 'light'}
//     )

   const authUser = () => {

    const form = {email, password}

    dispatch(signIn(form))

  }


  return (
    <View>
        <View style={{paddingHorizontal: '20%', marginTop: 50}}>
            <TextInput value={email} onChangeText={setEmail}
             placeholder={error && !email.length ? 'Enter correct email' : 'Email'} placeholderTextColor={error && !email.length ? 'red' : 'lightgray'} style={[error && !email.length ? styles.errorInput : styles.input, {color: colors.text}]} />
 
             <TextInput secureTextEntry value={password} onChangeText={setPassword}
             placeholder={error && !password.length ? 'Enter correct password' : 'Password'} placeholderTextColor={error && !password.length ? 'red' : 'lightgray'} style={[error && !password.length ? styles.errorInput : styles.input, {color: colors.text}]} />

            <Button title='LOGIN' onPress={() => {
              if(email.length > 0 && password.length > 0) {
                setError(false)
                authUser()
              }
              else setError(true)
            }}/>
        </View>
        {/* <StatusBar style="auto" /> */}
    </View>
  )
}

const styles = StyleSheet.create({ 
    input: {backgroundColor: 'rgb(40, 40, 40)', borderStyle: 'solid', borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, padding: 10},
    errorInput: {backgroundColor: 'rgb(40, 40, 40)', borderStyle: 'solid', borderWidth: 1, borderColor: 'red', borderRadius: 5, padding: 10}   
})

export default Auth