import React from 'react'
import { TouchableOpacity } from 'react-native'
import NavigationService from '~/navigationService'
import Diagnose from '../components/Diagnose'
import { isRequestSolved } from '~/mixins/diagnose/isRequestSolved'

const goToDetailedDiagnoseScreen = (diagnose) => {
  NavigationService.navigate('DetailedDiagnose', { diagnose })
}

const renderDiagnose = (diagnose, key) => {
  const answerQuantity = diagnose.amountOfAnswers || 0

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
        solved={isRequestSolved(diagnose)}
      />
    </TouchableOpacity>
  )
}

export const renderDiagnoses = (myDiagnoses) => (
  myDiagnoses.map((diagnose, index) => renderDiagnose(diagnose, index))
)
