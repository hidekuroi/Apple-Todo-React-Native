import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { useMyTheme } from '../../hooks/useMyTheme';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CreateNewListModal from '../../screens/CreateNewListModal';
import List from '../../screens/List';
import Todos from '../../screens/Todos';
import { TodoStackParamList } from "../../types/navigation-types";

const TodoStackNavigator = () => {

    const TodoStack = createNativeStackNavigator<TodoStackParamList>();

    const { login } = useTypedSelector(state => state.auth)
    const { colors } = useMyTheme()
  
    return(
      <TodoStack.Navigator initialRouteName='Todos'
       
       screenOptions={
        {
          headerLargeTitle: true,
          headerLargeStyle: {backgroundColor: colors.background},
          headerTransparent: Platform.OS === 'ios' ? true : false,
          headerBlurEffect: 'systemThinMaterial',
          headerBackTitle: 'Back',
          
        }
      }
      >
        <TodoStack.Screen name="Todos" component={Todos} options={
          {
            title: login,
            headerSearchBarOptions: {
              hideNavigationBar: true,
              placeholder: 'Search',
              hideWhenScrolling: true
            },
          }
        } />

        <TodoStack.Screen name="CreateNewListModal" component={CreateNewListModal} options={
          {
            title:'New todolist',
            presentation: 'modal',
            headerBlurEffect: 'systemThinMaterial',
            headerLargeTitle: false,
            headerLargeStyle: {backgroundColor: colors.modalBackground}
          }
        } />
          
        <TodoStack.Screen name="List" component={List} options={
          {
            presentation: 'card',
            headerLargeStyle: {backgroundColor:colors.background}
          }
        } />
      </TodoStack.Navigator>
    )
}

export default TodoStackNavigator;