import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import cannabisLeaf from './resources/placeholder.png'

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
  if (answered === false) {
    return (<View style={styles.notAnswered} />)
  }
  return (<View style={styles.answered} />)
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
