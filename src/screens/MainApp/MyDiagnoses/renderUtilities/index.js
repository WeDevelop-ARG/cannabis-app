import React from 'react'
import Diagnose from '../Diagnose'

const renderDiagnose = (diagnose, key) => {
  let answerQuantity = 0

  if (diagnose.answer) {
    answerQuantity = 1
  }

  return (
    <Diagnose
      key={key}
      thumbnail={diagnose.thumbnail}
      firebaseTimestamp={diagnose.createdAt}
      description={diagnose.text}
      answerQuantity={answerQuantity}
    />
  )
}

export const renderDiagnoses = (myDiagnoses) => (
  myDiagnoses.map((diagnose, index) => renderDiagnose(diagnose, index))
)
