import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { DiagnoseResponseForm } from '../DiagnoseResponseForm'
import { DiagnoseInfo } from '../DiagnoseInfo'
import { getDownloadURLFromImages } from '../utils'
import { firebaseTimestampToMoment } from '../utils/date'
import '../stylesheets/admin.css'
import { getUserUIDFromDiagnoseRef } from '../utils/diagnose'

const STALE_STATUS_AFTER_DAYS = 10

export const DiagnoseResponse = ({ state }) => {
  const [currentDiagnose, setCurrentDiagnose] = useState(null)
  const [diagnoses, setDiagnoses] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSnapshot = async (querySnapshot, filter) => {
    let newDiagnoses = diagnoses

    await Promise.all(
      querySnapshot.docChanges().map(async docChange => {
        const doc = docChange.doc
        const changeType = docChange.type

        if (changeType === 'added') {
          if (!newDiagnoses.find(diagnose => diagnose.id === doc.id)) {
            const docData = doc.data()
            const userUID = getUserUIDFromDiagnoseRef(doc.ref)
            const userSnap = await firebase.firestore().collection('users').doc(userUID).get()
            const username = userSnap.get('username')

            console.log(docData)
            newDiagnoses.push({
              id: doc.id,
              ref: doc.ref,
              userUID,
              username,
              ...docData
            })
          }
        }

        if (changeType === 'removed') {
          newDiagnoses = newDiagnoses.filter(diagnose => diagnose.id !== doc.id)
        }
      })
    )

    if (filter) {
      newDiagnoses = newDiagnoses.filter(filter)
    }

    setDiagnoses([...newDiagnoses])
  }

  const unansweredQuery = () => {
    return firebase
      .firestore()
      .collectionGroup('requests')
      .where('amountOfAnswers', '==', 0)
      .onSnapshot(onSnapshot)
  }
  const dateDaysAgo = (daysAgo) => {
    const date = new Date(Date.now())
    date.setDate(date.getDate() - daysAgo)
    return date
  }
  const filterBySolved = (diagnose) => diagnose.solved
  const filterByNotSolved = (diagnose) => !diagnose.solved
  const filterByLastActivity = (diagnose) => (diagnose.updatedAt !== undefined) && diagnose.updatedAt.toDate() >= dateDaysAgo(STALE_STATUS_AFTER_DAYS)
  const filterByAmountOfAnswers = (diagnose) => diagnose.amountOfAnswers > 0
  const filterStale = (diagnose) => !filterByLastActivity(diagnose) && filterByNotSolved(diagnose) && filterByAmountOfAnswers(diagnose)
  const filterInDiscussion = (diagnose) => filterByLastActivity(diagnose) && filterByNotSolved(diagnose) && filterByAmountOfAnswers(diagnose)
  const inDiscussionQuery = () => {
    return firebase
      .firestore()
      .collectionGroup('requests')
      .where('amountOfAnswers', '>', 0)
      .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterInDiscussion))
  }

  const staleQuery = () => {
    return firebase
      .firestore()
      .collectionGroup('requests')
      .where('amountOfAnswers', '>', 0)
      .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterStale))
  }

  const solvedQuery = () => {
    return firebase
      .firestore()
      .collectionGroup('requests')
      .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterBySolved))
  }

  useEffect(() => {
    const attachQueryListener = () => {
      if (state === 'unanswered') {
        return unansweredQuery()
      } else if (state === 'in discussion') {
        return inDiscussionQuery()
      } else if (state === 'stale') {
        return staleQuery()
      } else if (state === 'solved') {
        return solvedQuery()
      }
    }

    return attachQueryListener()
  }, [])

  useEffect(() => {
    const clearScreenIfCurrentDiagnoseWasAnsweredByAnotherOne = () => {
      if (currentDiagnose) {
        const queryForCurrentDiagnoseInDiagnoses = diagnoses.filter(diagnose => diagnose.id === currentDiagnose.id)
        const currentDiagnoseDoesNotExist = queryForCurrentDiagnoseInDiagnoses.length === 0
        if (currentDiagnoseDoesNotExist) {
          setCurrentDiagnose(null)
        }
      }
    }

    clearScreenIfCurrentDiagnoseWasAnsweredByAnotherOne()
  }, [diagnoses])

  const handleSubmit = async (values) => {
    setIsSubmitting(true)

    const writeNewResponse = async () => {
      const newResponse = {
        answer: values.answer,
        answeredBy: values.answeredBy,
        answeredByUID: firebase.auth().currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }

      await firebase
        .firestore()
        .collection(`users/${currentDiagnose.userUID}/requests/${currentDiagnose.id}/responses`)
        .add(newResponse)
    }

    const changeUpdateAtFieldForRequest = async () => {
      await firebase
        .firestore()
        .doc(`users/${currentDiagnose.userUID}/requests/${currentDiagnose.id}`)
        .update({
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    await writeNewResponse()
    await changeUpdateAtFieldForRequest()

    setDiagnoses(diagnoses.filter(diagnose => diagnose.id !== currentDiagnose.id))
    setCurrentDiagnose(null)
    setIsSubmitting(false)
  }

  const fetchDiagnoseImagesAndSetAsCurrent = async (diagnose) => {
    const imagesSources = await getDownloadURLFromImages(diagnose.imageReferences)
    setCurrentDiagnose({
      ...diagnose,
      imagesSources
    })
  }

  return (
    <div className='row'>
      <ListGroup className='column'>
        {diagnoses && diagnoses.map((diagnose, index) => (
          <ListGroup.Item action key={index} onClick={() => fetchDiagnoseImagesAndSetAsCurrent(diagnoses[index])}>
            {diagnose.id}{' '} - {diagnose.username} ({firebaseTimestampToMoment(diagnose.createdAt).format('LL')})
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className='diagnose-info-column'>
        {currentDiagnose && <DiagnoseInfo diagnose={currentDiagnose} />}
      </div>
      <div className='column'>
        {currentDiagnose && <DiagnoseResponseForm handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      </div>
    </div>
  )
}
