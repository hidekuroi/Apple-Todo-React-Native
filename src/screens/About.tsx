import { StatusBar } from 'expo-status-bar'
import React, { FC, useEffect, useState } from 'react'
import { View, Text, ScrollView, Button, Image } from 'react-native'
import { profileAPI } from '../api/social-api'
import Card from '../components/Card'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useMyTheme } from '../hooks/useMyTheme'
import { useTypedSelector } from '../hooks/useTypedSelector'

const About: FC = () => {

  const { colors } = useMyTheme();
  const dispatch = useAppDispatch()
  const { id } = useTypedSelector(state => state.auth)

  const [photo, setPhoto] = useState('')

  useEffect(() => {
    profileAPI.getProfile(id).then((data) => {
        setPhoto(data.photos.large)
    })
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' style={{backgroundColor: colors.background}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>

            <Card>
                <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 5}}>
                    <Image source={{uri: photo ? photo : undefined, height: 100, width: 100}} style={{borderRadius: 50, backgroundColor: 'lightgray'}} />
                </View>
            </Card>
                <Button title='About alert' onPress={() => alert("TodoHide Native 0.1.3")}/>
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}



export default About