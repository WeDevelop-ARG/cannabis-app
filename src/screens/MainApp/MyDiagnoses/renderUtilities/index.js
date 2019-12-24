import React from 'react'
import { TouchableOpacity } from 'react-native'
import NavigationService from '~/navigationService'
import Diagnose from '../Diagnose'

const goToDetailedDiagnoseScreen = (diagnose) => {
  NavigationService.navigate('DetailedDiagnose', { diagnose })
}

const renderDiagnose = (diagnose, key) => {
  let answerQuantity = 0

  if (diagnose.answer) {
    answerQuantity = 1
  }

  return (
    <TouchableOpacity
      onPress={() => goToDetailedDiagnoseScreen(diagnose)}
    >
      <Diagnose
        key={key}
        thumbnail={diagnose.thumbnail}
        firebaseTimestamp={diagnose.createdAt}
        description={diagnose.text}
        answerQuantity={answerQuantity}
      />
    </TouchableOpacity>
  )
}

export const renderDiagnoses = (myDiagnoses) => (
  myDiagnoses.map((diagnose, index) => renderDiagnose(diagnose, index))
)
