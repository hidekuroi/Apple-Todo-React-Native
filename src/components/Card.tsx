import React from 'react'
import { View, StyleSheet } from 'react-native';
import { useMyTheme } from '../hooks/useMyTheme';
import CardItem, { CardItemProps } from './CardItem';

const Card: React.FunctionComponent<{children: Array<React.ReactNode>}> & { Item: React.FunctionComponent<CardItemProps> } = ({ children }): JSX.Element => {

    const { colors } = useMyTheme()
    console.log(children.length)

    return (

          <View style={[styles.card, {backgroundColor: colors.card}]}>
            <View>
            {children}
            </View>
          </View>

  )   
}

const styles = StyleSheet.create({
    card: {
        width: '91.5%',
        borderRadius: 11,
        marginBottom: 36
    },
})

Card.Item = CardItem;

export default Card;