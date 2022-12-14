import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, Button, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { useAppDispatch } from './src/hooks/useAppDispatch';
import { useTypedSelector } from './src/hooks/useTypedSelector';
import { authCheck, signOut } from './src/reducers/AuthReducer';
import { store } from './src/reducers/store';
import Auth from './src/screens/Auth';
import Todos from './src/screens/Todos';

const Main = () => {

  const {login, isAuth} = useTypedSelector(state => state.auth)

  const Stack = createNativeStackNavigator();

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authCheck())
  }, [])

    const TestAlert = () => 
    Alert.alert('Sign Out', 'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel'
        },
        {
          text: 'Sign Out',
          onPress: () => signOutHandler(),
          style: 'destructive'
        },
      ], {cancelable: true}
    )

  const signOutHandler = () => {
    dispatch(signOut())
  }

  if(isAuth) {
    return(
      <Stack.Navigator initialRouteName='Todos'>
        <Stack.Screen name="Todos" component={Todos} options={{ title: login, headerLeft: () => (<Button onPress={TestAlert} color={'red'} title='Sign Out'/>) }} />
      </Stack.Navigator>
    )
  }
  else {
    return(
      <Stack.Navigator initialRouteName='Auth'>
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    )
  }

}






export default function App() {
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Main />
      </NavigationContainer>
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
});
