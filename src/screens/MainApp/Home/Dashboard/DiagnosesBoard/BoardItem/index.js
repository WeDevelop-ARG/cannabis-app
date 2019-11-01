import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import cannabisLeaf from './resources/placeholder.png'
import answeredIcon from './resources/answered.png'
import notAnsweredIcon from './resources/notAnswered.png'


const RealThumbnailOrPlaceholder = ({ thumbnail }) => (
  <Image
    source={thumbnail ? { uri: thumbnail } : cannabisLeaf}
    style={styles.thumbnail}
  />
)

const AnsweredIcon = ({ answered }) => {
  const icon = (answered === false) ? notAnsweredIcon : answeredIcon
  const style = (answered === false) ? styles.notAnswered : styles.answered
  return (<Image source={icon} style={style} />)
}

const BoardItem = ({ thumbnail, diagnose }) => {
  const moment = require('moment')
  const date = moment(diagnose.createdAt.seconds * 1000)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <RealThumbnailOrPlaceholder thumbnail={thumbnail} />
      </View>
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.titleText}>DESCRIPCIÓN</Text>
          <View>
            <Text style={styles.titleDate}>{date.format('DD/MM/YYYY')}</Text>
            <Text style={styles.titleDate}>{date.format('hh:mm a')}</Text>
          </View>
          <AnsweredIcon answered={diagnose.answered} />
        </View>
        <View>
          <Text style={styles.description}>{diagnose.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default BoardItem
