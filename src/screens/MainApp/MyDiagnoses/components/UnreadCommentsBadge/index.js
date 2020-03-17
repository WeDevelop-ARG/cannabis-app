import React from 'react'
import { View } from 'react-native'
import Subheader from '~/components/texts/Subheader'
import styles from './styles'

const UnreadCommentsBadge = ({ number }) => (
  <View style={styles.badge}>
    <Subheader white>{number}</Subheader>
  </View>
)

export default UnreadCommentsBadge
