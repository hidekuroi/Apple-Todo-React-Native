import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useTypedSelector } from '../hooks/useTypedSelector'
// import { authCheck, setAuthUser, signIn } from '../reducers/AuthReducer'
import { signIn } from '../features/auth/auth-slice'
import { useMyTheme } from '../hooks/useMyTheme'

//@ts-ignore
const Auth: FC = ({ navigation }) => {

  const dispatch = useAppDispatch()
  const {colors} = useMyTheme()
  const {isAuth, isFetching} = useTypedSelector(state => state.auth)

  const [error, setError] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


   const authUser = () => {

    const form = {email, password}

    dispatch(signIn(form))
  }

  useEffect(() => {
    if(isAuth) {
      setEmail('')
      setPassword('')
    }
  }, [isAuth])


  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' style={{}}>
        <View style={{paddingHorizontal: '5%', marginTop: 32}}>
            <TextInput editable={!isFetching} value={email} onChangeText={setEmail}
             placeholder={error && !email.length ? 'Enter correct email' : 'Email'} placeholderTextColor={error && !email.length ? 'red' : colors.inputPlaceholder} style={[error && !email.length ? styles.errorInput : styles.input, {color: colors.text, backgroundColor: colors.input, borderColor: error ? 'red' : colors.border}]} />
 
             <TextInput editable={!isFetching} secureTextEntry value={password} onChangeText={setPassword}
             placeholder={error && !password.length ? 'Enter correct password' : 'Password'} placeholderTextColor={error && !password.length ? 'red' : colors.inputPlaceholder} style={[error && !password.length ? styles.errorInput : styles.input, {color: colors.text, backgroundColor: colors.input, borderColor: error ? 'red' : colors.border}]} />

            <Button disabled={isFetching} title='LOGIN' onPress={() => {
              if(email.length > 0 && password.length > 0) {
                setError(false)
                authUser()
              }
              else setError(true)
            }}/>
        </View>
        {isFetching &&
        <View>
          <ActivityIndicator />
        </View>
        }
        <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({ 
    input: {borderStyle: 'solid', borderWidth: 1, borderRadius: 12, padding: 13, marginBottom: 8, fontSize: 16},
    errorInput: {borderStyle: 'solid', borderWidth: 1, borderColor: 'red', borderRadius: 12, padding: 13, marginBottom: 8, fontSize: 16}  
})

export default Auth