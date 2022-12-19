import { useHeaderHeight } from '@react-navigation/elements'
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
  const headerHeight = useHeaderHeight()

  const { id, email } = useTypedSelector(state => state.auth)
  

  const [photo, setPhoto] = useState('')

  useEffect(() => {
    profileAPI.getProfile(id).then((data) => {
        setPhoto(data.photos.large)
    })
  }, [])

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' style={{backgroundColor: colors.background}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: headerHeight/2}}>
          <Card>
            <Card.Item text='Version' helperText='0.1.4' isLast />
          </Card>
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}



export default About