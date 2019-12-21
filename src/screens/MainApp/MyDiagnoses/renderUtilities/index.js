import React from 'react'
import * as StorageService from '~/storageService'
import Diagnose from '../Diagnose'

const getURL = async (imageReference) => {
  try {
    return await StorageService.getDownloadURL(imageReference)
  } catch (error) {
    return null
  }
}

const renderDiagnose = async (diagnose, key) => {
  const thumbnail = await getURL(diagnose.imageReferences[0])
  let answerQuantity = 0

  if (diagnose.answer) {
    answerQuantity = 1
  }

  return (
    <Diagnose
      key={key}
      thumbnail={thumbnail}
      firebaseTimestamp={diagnose.createdAt}
      description={diagnose.text}
      answerQuantity={answerQuantity}
    />
  )
}

export const renderDiagnoses = async (myDiagnoses) => (
  myDiagnoses.reduce(
    async (diagnoses, diagnose, index) => {
      diagnoses = await diagnoses
      const renderedDiagnose = await renderDiagnose(diagnose, index)
      diagnoses.push(renderedDiagnose)

      return diagnoses
    },
    Promise.resolve([])
  )
)
