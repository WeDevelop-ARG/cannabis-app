import React from 'react'
import { View, Image } from 'react-native'
import AppText from '~/helpers/AppText'
import styles from './styles'
import cannabisLeaf from './resources/placeholder.png'

const RealThumbnailOrPlaceholder = ({ thumbnail }) => (
  <Image
    source={thumbnail ? { uri: thumbnail } : cannabisLeaf}
    style={styles.thumbnail}
  />
)

const Diagnose = ({ thumbnail, answer, answeredBy, date, time }) => (
  <View style={styles.diagnoseContainer}>
    <RealThumbnailOrPlaceholder thumbnail={thumbnail} />
    <View style={styles.answerContainer}>
      <AppText style={styles.answeredBy}>
        Respondido por {answeredBy} el {date} a las {time}
      </AppText>
      <AppText style={styles.answerSeparator} />
      <AppText style={styles.answer}>
        {answer}
      </AppText>
    </View>
  </View>
)

export default Diagnose