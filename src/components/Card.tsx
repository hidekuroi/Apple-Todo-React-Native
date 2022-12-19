import React from 'react'
import { View, StyleSheet, Platform } from 'react-native';
import { useMyTheme } from '../hooks/useMyTheme';
import CardItem, { CardItemProps } from './CardItem';

const Card: React.FunctionComponent<{children: Array<React.ReactNode>, backgroundColor?: string}> & { Item: React.FunctionComponent<CardItemProps> } = ({ children, backgroundColor }): JSX.Element => {

    const { colors } = useMyTheme()
    // console.log(children.length)

    return (

          <View style={[styles.card, {backgroundColor: backgroundColor ? backgroundColor : colors.card}]}>
            <View>
            {children}
            </View>
          </View>

  )   
}

const styles = StyleSheet.create({
    card: {
        width: Platform.OS === 'ios' ? '91.5%' : '100%',
        borderRadius: 11,
        marginBottom: 36
    },
})

Card.Item = CardItem;

export default Card;