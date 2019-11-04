import React from 'react'
import { View } from 'react-native'
import AppText from '~/helpers/AppText'
import styles from './styles'

const NoAnswersYet = () => (
  <View>
    <AppText style={styles.noAnswersText}>Todavía no hay respuestas :(</AppText>
  </View>
)

export default NoAnswersYet
