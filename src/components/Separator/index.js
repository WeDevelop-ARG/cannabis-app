import React from 'react'
import { View } from 'react-native'
import { Body } from '~/components'
import styles from './styles'

const Separator = ({ style, children }) => (
  <View style={style}>
    <View style={styles.container}>
      <View style={styles.line} />
      <Body style={styles.text}>
        {children}
      </Body>
    </View>
  </View>
)

export default Separator
