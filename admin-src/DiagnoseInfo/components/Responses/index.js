import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { queryAllResponsesForRequest } from '../../../services/database/queryAllResponsesForRequest'
import { firebaseTimestampToMoment } from '../../../utils/date'
import Response from '../Response'
import './styles.css'

const Responses = ({ diagnose }) => {
  const [responses, setResponses] = useState([])
  const scrollToBottomRef = React.createRef()

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

  useEffect(() => {
    const scrollToBottom = () => {
      scrollToBottomRef.current.scrollTop = scrollToBottomRef.current.scrollHeight
    }

    if (scrollToBottomRef.current) {
      scrollToBottom()
    }
  }, [scrollToBottomRef])

  return (
    !isEmpty(responses) && (
      <div ref={scrollToBottomRef} className='responses'>
        {responses}
      </div>
    )
  )
}

export default Responses
