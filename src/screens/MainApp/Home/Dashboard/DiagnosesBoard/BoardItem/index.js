import React from 'react'
import { View, Image } from 'react-native'
import styles from './styles'
import cannabisLeaf from './resources/placeholder.png'
import answeredIcon from './resources/answered.png'
import notAnsweredIcon from './resources/notAnswered.png'
import AppText from '~/helpers/AppText'
import moment from 'moment'

const RealThumbnailOrPlaceholder = ({ thumbnail }) => (
  <Image
    source={thumbnail ? { uri: thumbnail } : cannabisLeaf}
    style={styles.thumbnail}
  />
)

const AnsweredIcon = ({ answered }) => {
  const icon = answered ? answeredIcon : notAnsweredIcon
  const style = answered ? styles.answered : styles.notAnswered
  return <Image source={icon} style={style} />
}

const BoardItem = ({ thumbnail, diagnose }) => {
  const date = moment(diagnose.createdAt.seconds * 1000)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <RealThumbnailOrPlaceholder thumbnail={thumbnail} />
      </View>
      <View style={styles.body}>
        <View style={styles.title}>
          <AppText style={styles.titleText}>DESCRIPCIÓN</AppText>
          <View>
            <AppText style={styles.titleDate}>{date.format('DD/MM/YYYY')}</AppText>
            <AppText style={styles.titleDate}>{date.format('hh:mm a')}</AppText>
          </View>
          <AnsweredIcon answered={diagnose.answered} />
        </View>
        <View>
          <AppText>{diagnose.text}</AppText>
        </View>
      </View>
    </View>
  )
}

export default BoardItem
