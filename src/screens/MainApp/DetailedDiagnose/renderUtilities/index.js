import React from 'react'
import { getUsernameByUID } from '~/databaseService'
import { firebaseTimestampToMoment } from '~/mixins/date'
import Comment from '../components/Comment'

const buildDataFromRawResponse = async (response) => {
  let answeredBy

  try {
    answeredBy = response.answeredBy || await getUsernameByUID(response.answeredByUID)
  } catch (error) {
    answeredBy = ''
  }

  const data = {
    id: response.id,
    answer: response.answer,
    answeredBy,
    createdAt: firebaseTimestampToMoment(response.createdAt, 'es').format('l')
  }

  return data
}

export const renderResponse = async (response) => {
  const data = await buildDataFromRawResponse(response)
  return (
    <Comment
      key={data.id}
      text={data.answer}
      by={data.answeredBy}
      date={data.createdAt}
    />
  )
}

export const renderResponses = async (responses) => Promise.all(responses.map(async (response) => renderResponse(response)))
