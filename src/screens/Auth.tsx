import { StatusBar } from "expo-status-bar"
import React, { FC, useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { signIn } from "../features/auth/auth-slice"
import { useMyTheme } from "../hooks/useMyTheme"
import { openBrowserAsync } from "expo-web-browser"
import { useLocale } from "../hooks/useLocale"

const Auth: FC = () => {
  const dispatch = useAppDispatch()
  const { colors } = useMyTheme()
  const i18n = useLocale()
  const { isAuth, isFetching } = useTypedSelector((state) => state.auth)

  const [error, setError] = useState<boolean>(false)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  useEffect(() => {
    if (isAuth) {
      setEmail("")
      setPassword("")
    }
  }, [isAuth])

  const authUser = () => {
    const form = { email, password }

    dispatch(signIn(form))
  }

  const handleSignup = () => {
    openBrowserAsync('https://social-network.samuraijs.com/signUp')
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
      <View
        style={{
          width: "100%",
          marginTop: 32,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={{ width: "91.5%" }}>
          <TextInput
            editable={!isFetching}
            value={email}
            onChangeText={setEmail}
            placeholder={
              error && !email.length ? i18n.t('authCorrectEmail') : i18n.t('authEmail')
            }
            placeholderTextColor={
              error && !email.length ? "red" : colors.inputPlaceholder
            }
            style={[
              error && !email.length ? styles.errorInput : styles.input,
              {
                color: colors.text,
                backgroundColor: colors.input,
                borderColor: error ? "red" : colors.border,
              },
            ]}
          />
        </View>

        <View style={{ width: "91.5%" }}>
          <TextInput
            editable={!isFetching}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder={
              error && !password.length ? i18n.t('authCorrectPassword') : i18n.t('authPassword')
            }
            placeholderTextColor={
              error && !password.length ? "red" : colors.inputPlaceholder
            }
            style={[
              error && !password.length ? styles.errorInput : styles.input,
              {
                color: colors.text,
                backgroundColor: colors.input,
                borderColor: error ? "red" : colors.border,
              },
            ]}
          />
        </View>

        <Button
          disabled={isFetching}
          title={i18n.t('authLogin')}
          onPress={() => {
            if (email.length > 0 && password.length > 0) {
              setError(false)
              authUser()
            } else setError(true)
          }}
          
        />
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
          <Text style={{color: colors.helperText}}>{i18n.t('authNoaccount')}</Text>
        <TouchableOpacity onPress={handleSignup}>
          
          <Text style={{color: colors.helperText, textDecorationLine: 'underline'}}>{i18n.t('authSignup')}</Text>
        </TouchableOpacity>
        </View>
      </View>
      {isFetching && (
        <View>
          <ActivityIndicator />
        </View>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 11,
    padding: 13,
    marginBottom: 8,
    fontSize: 16,
  },
  errorInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 11,
    padding: 13,
    marginBottom: 8,
    fontSize: 16,
  },
})

export default Auth
