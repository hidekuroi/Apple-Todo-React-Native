import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, TouchableOpacity, TouchableHighlight, Button, TextInput, Alert } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import Navbar from './src/Navbar';
import { store } from './src/reducers';
import { setAuthUser } from './src/reducers/AuthReducer';

const Main = () => {

  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const AuthPrompt = () => 
    Alert.prompt('Enter password', 'Enter \"dixon\" password to display username in navbar.',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: (password) =>
          {
            if(password === 'dixon') authUser()
            else alert('Долбоеб, правильно напиши.')
          }
      }
    ], 'secure-text'
    )

  const TestAlert = () => 
    Alert.alert('Signed Out', 'You have been signed out',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'destructive'
        },
        {
          text: 'Ok',
          onPress: () => console.log('Ok pressed'),
          style: 'default'
        },
      ], {cancelable: true, userInterfaceStyle: 'light'}
    )

  const authUser = () => {
    dispatch(setAuthUser('shit@poop.com', value))

    setValue('')
  }

  const handlePress2 = () => {
    dispatch(setAuthUser('', ''))
    TestAlert()
  }

  return(
    <View style={styles.container}>
        <Navbar />
        <View>
          <View style={{paddingHorizontal: '20%', marginTop: 50}}>
            <TextInput value={value} onChangeText={setValue}
             placeholder={error ? 'Enter correct username' : 'Username'} placeholderTextColor={error && !value.length ? 'red' : 'lightgray'} style={error ? styles.errorInput : styles.input} />
            <Button title='LOGIN' onPress={() => {
              if(value.length > 0) {
                setError(false)
                AuthPrompt()
              }
              else setError(true)
            }}/>
            <Button title='SIGN OUT' onPress={handlePress2} color={'rgb(240, 0, 0)'} />
          </View>
        </View>

        <StatusBar style="light" />
      </View>
  )
}






export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider> 
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {borderStyle: 'solid', borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, padding: 10},
  errorInput: {borderStyle: 'solid', borderWidth: 1, borderColor: 'red', borderRadius: 5, padding: 10}
});
