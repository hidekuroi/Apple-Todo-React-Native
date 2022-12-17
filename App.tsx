import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { useAppDispatch } from './src/hooks/useAppDispatch';
import { useTypedSelector } from './src/hooks/useTypedSelector';
import { authCheck } from './src/features/auth/auth-slice';
import { store } from './src/app/store';
import Auth from './src/screens/Auth';
import List from './src/screens/List';
import Settings from './src/screens/Settings';
import Todos from './src/screens/Todos';

const Main = () => {

  const {login, isAuth} = useTypedSelector(state => state.auth)
  console.log(isAuth)
  // const { isInitilized } = useTypedSelector(state => state.app)
  const scheme = useColorScheme();
  const navigation = useNavigation()
  const {colors} = useTheme()

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authCheck())
  }, [])

    

  const TodoScreen = () => {
  
    return(
      <Stack.Navigator initialRouteName='Todos'
       
       screenOptions={
        {
          headerLargeTitle: true,
          headerLargeStyle: {backgroundColor:colors.background},
          headerStyle: {backgroundColor: colors.card},
          headerTransparent: true,
          headerBlurEffect: 'systemMaterial',
          headerBackTitle: 'Back',
          
        }
      }
      >
        <Stack.Screen name="Todos" component={Todos} options={
          {
            title: login,
            // animationTypeForReplace: 'push',
            
          }
        } />
        <Stack.Screen name="List" component={List} options={
          {
            presentation: 'card'
          }
        } />
      </Stack.Navigator>
    )
  }
  const SettingsScreen = () => {
    return(
      <Stack.Navigator initialRouteName='Settings' 
      screenOptions={
        {
          headerLargeTitle: true,
          headerLargeStyle: {backgroundColor:colors.background},
          headerStyle: {backgroundColor: colors.card},
          headerTransparent: true,
          headerBlurEffect: 'systemMaterial',
          headerSearchBarOptions: {
            hideNavigationBar: true,
            placeholder: 'Search',
            hideWhenScrolling: true
          }
        }
      }
      >
        <Stack.Screen name="Settings" component={Settings}/>
      </Stack.Navigator>
    )
  }


    // const MainScreen = () => {
      if(isAuth) {
        return <Tab.Navigator initialRouteName='TodoScreen' screenOptions={{headerShown: false, tabBarBackground: () => (
          <BlurView tint={scheme === 'dark' ? 'dark' : 'light'} intensity={100} style={StyleSheet.absoluteFill} />
        ), tabBarStyle: {position: 'absolute'}}}>
    
          <Tab.Screen name="TodoScreen" component={TodoScreen} options={{
            tabBarLabel: 'Todo',
            tabBarIcon: ({size, color, focused}) => (
              <Ionicons name={focused ? 'checkbox' : 'checkbox-outline'} size={size} color={color}/>
            )
          }}/>
          <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({size, color, focused}) => (
              <Ionicons name={focused ? 'cog' : 'cog-outline'} size={size} color={color}/>
            )
          }}/>
    
        </Tab.Navigator>
      }
    // }

    // useEffect(() => {
    //   console.log(isAuth)
    //   if(isAuth) navigation.navigate("MainScreen")
    //   else navigation.navigate("Auth")
    // }, [isAuth])

    // useEffect(() => {
    //   dispatch(initilizeApp())
    // }, [])

    // console.log(isInitilized)
    else {
    return(
      <Stack.Navigator initialRouteName='Auth'>
        <Stack.Screen name="Auth" component={Auth}
         options={
          {
            headerLargeTitle: true,
            headerLargeStyle: {backgroundColor:colors.background},
            headerStyle: {backgroundColor: colors.card},
            headerTransparent: Platform.OS === 'ios' ? true : false,
            headerBlurEffect: 'systemMaterial',
          }
        }
        />
        {/* <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false, presentation: 'fullScreenModal', animation: 'flip'}}/> */}
      </Stack.Navigator>
    )
    }
  

}






export default function App() {
  const scheme = useColorScheme();
  // console.log(scheme)
  const MyDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgb(242, 242, 246)',
      card: 'rgb(255, 255, 255)',
      touching: 'rgb(229, 229, 234)',
      divider: 'rgb(229, 229, 234)',
      helperText: 'rgb(138, 138, 142)',
      helperIcon: 'rgb(196, 196, 198)',
      touchingHelperIcon: 'rgb(178, 178, 184)',
      disabledText: 'rgb(143, 143, 143)',
      searchbar: 'rgb(227, 227, 232)'
    }
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: 'rgb(0, 0, 0)',
      card: 'rgb(28, 28, 30)',
      touching: 'rgb(44, 44, 46)',
      divider: 'rgb(44, 44, 46)',
      helperText: 'rgb(152, 152, 159)',
      helperIcon: 'rgb(90, 90, 94)',
      touchingHelperIcon: 'rgb(101, 101, 105)',
      disabledText: 'rgb(143, 143, 143)',
      searchbar: 'rgb(28, 28, 30)'
    }
  }

  return (
    <Provider store={store}>
        <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyDefaultTheme}>
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
