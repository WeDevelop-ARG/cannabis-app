import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import AppText from '~/helpers/AppText'

const CreateDiagnoseBoard = ({ handleGoToCreateDiagnoseScreen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AppText style={styles.text}>
          ¿Tu planta de Cannabis se ve rara?
        </AppText>
        <AppText style={styles.text}>
          ¿Parece estar enferma?
        </AppText>
        <AppText style={styles.text}>
          No te preocupes más
        </AppText>
      </View>
      <TouchableOpacity
        onPress={handleGoToCreateDiagnoseScreen}
      >
        <AppText style={styles.button}>Solicitá un diagnóstico</AppText>
      </TouchableOpacity>
    </View>
  )
}

export default CreateDiagnoseBoard
