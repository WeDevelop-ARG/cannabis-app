import React, { useEffect, useState, useCallback, createRef } from 'react'
import { isEmpty, last } from 'lodash'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import Response from '../Response'
import { snapshotTopResponsesForRequest } from '../services/database/snapshotTopResponsesForRequest'
import { queryAfterTopResponsesForRequest } from '../services/database/queryAfterTopResponsesForRequest'
import { firebaseTimestampToMoment } from '../utils/date'
import { buildResponseRepresentationFromDocumentSnapshot } from '../utils/responses/buildResponseRepresentationFromDocumentSnapshot'
import classes from './styles.scss'

const ResponsesChat = ({ diagnose }) => {
  const [responses, setResponses] = useState([])
  const [responsesData, setResponsesData] = useState([])
  const [allowScrolling, setAllowScrolling] = useState(true)
  const scrollRef = createRef()

  const onSnapshot = async (querySnapshot) => {
    const newResponsesData = []

    await Promise.all(
      querySnapshot.docChanges().map(async docChange => {
        const doc = docChange.doc
        const changeType = docChange.type

        if (changeType === 'added') {
          newResponsesData.push(await buildResponseRepresentationFromDocumentSnapshot(doc))
        }
      })
    )

    setResponsesData(prev => [...newResponsesData, ...prev])
    setAllowScrolling(true)
  }

  const fetchMoreResponses = useCallback(
    async () => {
      const responsesDocumentSnapshots = await queryAfterTopResponsesForRequest(diagnose.userUID, diagnose.id, last(responsesData).createdAt)
      const newResponsesData = await Promise.all(responsesDocumentSnapshots.map(async doc => buildResponseRepresentationFromDocumentSnapshot(doc)))

      setAllowScrolling(false)
      setResponsesData([...responsesData, ...newResponsesData])
    }, [responsesData])

  useEffect(() => {
    const attachSnapshotListener = () => {
      return snapshotTopResponsesForRequest(diagnose.userUID, diagnose.id, onSnapshot)
    }

    return attachSnapshotListener()
  }, [diagnose])

  useEffect(() => {
    const buildResponses = async () => {
      const responsesComponents = responsesData.slice().reverse().map((response) => {
        let date
        if (response.createdAt) date = firebaseTimestampToMoment(response.createdAt).format('LLL')
        else date = moment().format('LLL')

        return (
          <Response
            key={response.id}
            text={response.answer}
            date={date}
            isAdmin={Boolean(response.answeredBy)}
          />
        )
      })

      setResponses(responsesComponents)
    }

    buildResponses()
  }, [responsesData])

  const scrollToBottom = () => {
    if (scrollRef.current && scrollRef.current.scrollHeight) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (allowScrolling) {
      scrollToBottom()
    }
  }, [responses])

  return (
    !isEmpty(responses) && (
      <div
        ref={scrollRef}
        className={classes.responses}
      >
        <div className={classes.fetchMoreButton}>
          <Button variant='primary' onClick={fetchMoreResponses}>
            Fetch more responses
          </Button>
        </div>
        {responses}
      </div>
    )
  )
}

export default ResponsesChat
