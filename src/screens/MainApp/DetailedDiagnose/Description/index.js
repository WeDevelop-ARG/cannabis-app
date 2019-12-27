import React from 'react'
import { View } from 'react-native'
import { Text } from '~/components'
import styles from './styles'

const Description = ({ description }) => (
  <View style={styles.descriptionContainer}>
    <Text fontVariant='h2' colorVariant='black'>Descripción</Text>
    <Text />
    <Text colorVariant='black'>{description}</Text>
  </View>
)

export default Description
