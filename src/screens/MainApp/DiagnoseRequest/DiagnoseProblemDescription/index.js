import React from 'react'
import { TextInput } from 'react-native'
import styles from './styles'

const DiagnoseProblemDescription = ({ problemDescription, setProblemDescription }) => (
  <TextInput
    style={styles.problemDescriptionInput}
    onChangeText={setProblemDescription}
    value={problemDescription}
    multiline
    placeholder='Descripción del problema...'
    placeholderTextColor='red'
  />
)

export default DiagnoseProblemDescription
