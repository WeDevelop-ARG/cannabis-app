import React from 'react'
import { View } from 'react-native'
import { Text } from '~/components'
import styles from './styles'

const TimeDate = ({ date }) => (
  <View style={styles.timedateContainer}>
    <View>
      <Text colorVariant='black'>Fecha</Text>
      <Text fontVariant='date' colorVariant='black'>{date.format('DD/MM/YYYY')}</Text>
    </View>
    <View>
      <Text colorVariant='black'> Hora</Text>
      <Text fontVariant='date' colorVariant='black'> {date.format('hh:mm')}</Text>
    </View>
  </View>
)

export default TimeDate
