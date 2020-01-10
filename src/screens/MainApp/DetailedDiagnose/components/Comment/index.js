import React from 'react'
import { View } from 'react-native'
import { Subheader, Body, Date } from '~/components/texts'
import styles from './styles'

const Comment = ({ text, by, date }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.metadataContainer}>
        <Subheader style={styles.by}>{by}</Subheader>
        <Date gray2>{date}</Date>
      </View>
      <Body gray>{text}</Body>
    </View>
  )
}

export default Comment
