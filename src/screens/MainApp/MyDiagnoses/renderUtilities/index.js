import React from 'react'
import NavigationService from '~/navigationService'
import Diagnose from '../components/Diagnose'
import Button from '~/components/buttons/Button'
import { isRequestSolved } from '~/mixins/diagnose/isRequestSolved'

const goToDetailedDiagnoseScreen = (diagnose) => {
  NavigationService.navigate('DetailedDiagnose', { diagnose })
}

export const renderDiagnose = (diagnose, key) => {
  const answerQuantity = diagnose.amountOfAnswers || 0

  return (
    <Button
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
    </Button>
  )
}

export const renderDiagnoses = (myDiagnoses) => (
  myDiagnoses.map((diagnose, index) => renderDiagnose(diagnose, index))
)
