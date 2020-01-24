import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { DiagnoseResponseForm } from '../DiagnoseResponseForm'
import { DiagnoseInfo } from '../DiagnoseInfo'
import { getDownloadURLFromImages } from '../utils'
import { firebaseTimestampToMoment } from '../utils/date'
import '../stylesheets/admin.css'
import { getUserUIDFromDiagnoseRef } from '../utils/diagnose'

export const DiagnoseResponse = () => {
  const [currentDiagnose, setCurrentDiagnose] = useState(null)
  const [diagnoses, setDiagnoses] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const attachQueryListenerForUnansweredDiagnoses = () => {
      firebase
        .firestore()
        .collectionGroup('requests')
        .where('amountOfAnswers', '==', 0)
        .onSnapshot(async (querySnapshot) => {
          let unanswered = diagnoses

          await Promise.all(
            querySnapshot.docChanges().map(async docChange => {
              const doc = docChange.doc
              const changeType = docChange.type

              if (changeType === 'added') {
                if (!unanswered.find(diagnose => diagnose.id === doc.id)) {
                  const docData = doc.data()
                  const userUID = getUserUIDFromDiagnoseRef(doc.ref)
                  const userSnap = await firebase.firestore().collection('users').doc(userUID).get()
                  const username = userSnap.get('username')
                  unanswered.push({
                    id: doc.id,
                    ref: doc.ref,
                    userUID,
                    username,
                    ...docData
                  })
                }
              }

              if (changeType === 'removed') {
                unanswered = unanswered.filter(diagnose => diagnose.id !== doc.id)
              }
            })
          )

          setDiagnoses([...unanswered])
        })
    }

    attachQueryListenerForUnansweredDiagnoses()
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
