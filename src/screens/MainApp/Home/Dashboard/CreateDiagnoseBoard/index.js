import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

const CreateDiagnoseBoard = ({ handleGoToCreateDiagnoseScreen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>
          ¿Tu planta de Cannabis se ve rara?
        </Text>
        <Text style={styles.text}>
          ¿Parece estar enferma?
        </Text>
        <Text style={styles.text}>
          No te preocupes más
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleGoToCreateDiagnoseScreen}
      >
        <Text style={styles.button}>Solicitá un diagnóstico</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateDiagnoseBoard
