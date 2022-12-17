import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useMyTheme } from '../hooks/useMyTheme'

const CreateNewListModal: FC = () => {

  //const {login, isAuth} = useTypedSelector(state => state.auth)

  const { colors, dark } = useMyTheme();
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Done" disabled/>,
      headerLeft: () => <Button title="Cancel" onPress={() => navigation.goBack()} />
    })
  }, [])
  
  
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' style={{backgroundColor: colors.modalBackground}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={[styles.list, {backgroundColor: colors.modalCard}]}>

            <View style={styles.listItem}>
              <Text style={{color: colors.text}}>ASDSAD</Text>
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

export default CreateNewListModal