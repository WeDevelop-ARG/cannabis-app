import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import AppText from '~/helpers/AppText'
import styles from './styles'

const DiagnoseError = ({ error }) => (
  <KeyboardAvoidingView style={styles.errorContainer}>
    {error && <AppText style={styles.errorMessage}>{error}</AppText>}
  </KeyboardAvoidingView>
)

export default DiagnoseError
