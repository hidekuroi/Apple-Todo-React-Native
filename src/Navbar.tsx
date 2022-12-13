import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTypedSelector } from './hooks/useTypedSelector'

const Navbar: FC = () => {

  const {login, isAuth} = useTypedSelector(state => state.auth)

  return (
    <View style={styles.container}>
      {/* //! IT IS MEANT TO BE, DO NOT FORGET */}
        {/* <Text style={styles.text}>{isAuth ? login.toUpperCase() : 'TODOHIDE'}</Text> */}
        <Text style={styles.text}>{login ? login.toUpperCase() : 'TODOHIDE'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: 55,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    text: {
        color: '#fff',
        fontSize: 16
    }
})

export default Navbar