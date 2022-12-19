import { useHeaderHeight } from '@react-navigation/elements'
import { StatusBar } from 'expo-status-bar'
import React, { FC, useEffect, useState } from 'react'
import { View, Text, ScrollView, Button, Image } from 'react-native'
import { profileAPI } from '../api/social-api'
import Card from '../components/Card'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useMyTheme } from '../hooks/useMyTheme'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Appearence: FC = () => {

  const { colors, dark } = useMyTheme();
  const headerHeight = useHeaderHeight()

  const [value, setValue] = useState(false)

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' style={{backgroundColor: colors.background}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: headerHeight/2}}>
            <Card>
                <Card.Item text='Theme' helperText={dark ? 'Dark' : 'Light'} isLast/>
            </Card>
            <Card>
                <Card.Item text='test' isLast switchValue={value} onSwitch={() => setValue(!value)}/>
            </Card>
            {value && <Button title='Secret button' color={colors.primary} onPress={() => alert('Dxon Broudi')} />}
        </View>
        <StatusBar style="auto" />
    </ScrollView>
  )
}



export default Appearence