import React from 'react'
import moment from 'moment'
import Diagnose from '../Diagnose'
import * as DatabaseService from '~/databaseService'
import * as StorageService from '~/storageService'

export const getDiagnosesFromDatabase = async () => {
  try {
    return await DatabaseService.getAnsweredDiagnosesForCurrentUser()
  } catch (error) {
    return []
  }
}

export const getDiagnosesFromAnswers = async (answers) => (
  answers.reduce(
    async (diagnoses, answer, index) => {
      diagnoses = await diagnoses
      const diagnose = await getDiagnoseFromAnswer(answer, index)
      diagnoses.push(diagnose)

      return diagnoses
    },
    Promise.resolve([])
  )
)

const getDiagnoseFromAnswer = async (answer, key) => {
  const thumbnail = await getURL(answer.imageReferences[0])
  const date = moment(answer.updatedAt.seconds * 1000)
  return (
    <Diagnose key={key}
      thumbnail={thumbnail}
      answeredBy={answer.answeredBy}
      answer={answer.answer}
      date={date.format('DD/MM/YYYY')}
      time={date.format('hh:mm a')}
    />
  )
}

const getURL = async (imageReference) => {
  try {
    return await StorageService.getDownloadURL(imageReference)
  } catch (error) {
    return null
  }
}

export const sortAnswersByMostRecentCreation = (answers) => (
  answers.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
)

export const sortAnswersByMostRecentUpdate = (answers) => (
  answers.sort((a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis())
)
