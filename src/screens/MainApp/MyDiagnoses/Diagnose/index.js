import React from 'react'
import { View } from 'react-native'
import pluralize from 'pluralize'
import { firebaseTimestampToMoment } from '~/mixins/date'
import { Text, RealThumbnailOrPlaceholder } from '~/components'
import styles from './styles'

const Diagnose = ({ thumbnail, firebaseTimestamp, description, answerQuantity }) => {
  const date = firebaseTimestampToMoment(firebaseTimestamp)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <RealThumbnailOrPlaceholder
          thumbnail={thumbnail}
          style={styles.image}
        />
      </View>
      <View style={styles.information}>
        <View style={styles.dates}>
          <Text fontVariant='date' colorVariant='black'>{date.format('DD/MM/YYYY')}</Text>
          <Text fontVariant='date' colorVariant='black'> {date.format('hh:mm a')}</Text>
        </View>
        <View style={styles.description}>
          <Text numberOfLines={3} colorVariant='black'>{description}</Text>
        </View>
        <View style={styles.answers}>
          <Text colorVariant='black'>
            {answerQuantity} {pluralize('respuesta', answerQuantity)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Diagnose
