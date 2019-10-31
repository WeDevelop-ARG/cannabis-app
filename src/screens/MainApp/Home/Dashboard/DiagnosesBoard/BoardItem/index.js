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

const parseDate = (date) => {
  return '' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

const parseTime = (date) => {
  return '' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

const AnsweredIcon = ({ answered }) => {
  const icon = (answered === false) ? notAnsweredIcon : answeredIcon
  const style = (answered === false) ? styles.notAnswered : styles.answered
  return (<Image source={icon} style={style} />)
}

const BoardItem = (props) => {
  const date = new Date(props.diagnose.createdAt.seconds * 1000)

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <RealThumbnailOrPlaceholder thumbnail={props.thumbnail} />
      </View>
      <View style={styles.body}>
        <View style={styles.title}>
          <Text style={styles.titleText}>DESCRIPCIÓN</Text>
          <View>
            <Text style={styles.titleDate}>{parseDate(date)}</Text>
            <Text style={styles.titleDate}>{parseTime(date)}</Text>
          </View>
          <AnsweredIcon answered={props.diagnose.answered} />
        </View>
        <View>
          <Text style={styles.description}>{props.diagnose.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default BoardItem
