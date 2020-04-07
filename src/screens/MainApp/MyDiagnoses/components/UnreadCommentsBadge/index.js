import React from 'react'
import { View } from 'react-native'
import Subheader from '~/components/texts/Subheader'
import styles from './styles'

const getSpecialStyleForNumber = (number) => {
  let style = []
  switch (number) {
    case 3:
      style = styles.textVerticalAlignmentAuto
      break
    case 4:
      style = [styles.textVerticalAlignmentAuto, styles.textPaddingRight]
      break
    case 5:
      style = styles.textVerticalAlignmentAuto
      break
    case 7:
      style = [styles.textVerticalAlignmentAuto, styles.textPaddingLeft]
      break
    case 9:
      style = styles.textVerticalAlignmentAuto
      break
    default:
      style = styles.textVerticalAlignmentCenter
      break
  }

  return style
}

const UnreadCommentsBadge = ({ number }) => (
  <View style={styles.badge}>
    <Subheader white style={[styles.number, getSpecialStyleForNumber(number)]}>{number}</Subheader>
  </View>
)

export default UnreadCommentsBadge
