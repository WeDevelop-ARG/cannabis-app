import React from 'react'
import { View } from 'react-native'
import pluralize from 'pluralize'
import { firebaseTimestampToMoment } from '~/mixins/date'
import { RealThumbnailOrPlaceholder } from '~/components'
import { Subheader, Body } from '~/components/texts'
import styles from './styles'

const Diagnose = ({ thumbnail, firebaseTimestamp, description, answerQuantity }) => {
  const date = firebaseTimestampToMoment(firebaseTimestamp)

  return (
    <View style={styles.container}>
      <View>
        <RealThumbnailOrPlaceholder
          thumbnail={thumbnail}
          style={styles.image}
        />
      </View>
      <View style={styles.information}>
        <View style={styles.dates}>
          <Subheader>{date.format('D MMM')}</Subheader>
        </View>
        <View style={styles.description}>
          <Body numberOfLines={2}>{description}</Body>
        </View>
        <View style={styles.answers}>
          <Body gray>
            {answerQuantity} {pluralize('respuesta', answerQuantity)}
          </Body>
        </View>
      </View>
    </View>
  )
}

export default Diagnose
