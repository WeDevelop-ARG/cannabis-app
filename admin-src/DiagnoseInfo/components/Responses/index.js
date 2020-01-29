import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { queryAllResponsesForRequest } from '../../../services/database/queryAllResponsesForRequest'
import { firebaseTimestampToMoment } from '../../../utils/date'
import Response from '../Response'
import classes from './styles.css'

const Responses = ({ diagnose }) => {
  const [responses, setResponses] = useState([])

  useEffect(() => {
    const buildResponses = async () => {
      const responses = await queryAllResponsesForRequest(diagnose.userUID, diagnose.id)

      const responsesComponents = responses.map((response, key) =>
        <Response
          key={key}
          text={response.answer}
          date={firebaseTimestampToMoment(response.createdAt).format('LLL')}
          isAdmin={response.answeredBy !== diagnose.username}
        />
      )

      setResponses(responsesComponents.reverse())
    }

    buildResponses()
  }, [])

  const scrollToBottom = (ref) => {
    ref.scrollTop = ref.scrollHeight
  }

  return (
    !isEmpty(responses) && (
      <div
        ref={ref => scrollToBottom(ref)}
        className={classes.responses}
      >
        {responses}
      </div>
    )
  )
}

export default Responses
