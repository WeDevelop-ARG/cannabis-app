import React from 'react'
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import styles from './styles'

const FullScreenActivityIndicator = () => (
  <KeyboardAvoidingView style={styles.container}>
    <ActivityIndicator size='large' />
  </KeyboardAvoidingView>
)

export default FullScreenActivityIndicator
