import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { DiagnoseResponseForm } from '../DiagnoseResponseForm'
import { DiagnoseInfo } from '../DiagnoseInfo'
import { getDownloadURLFromImages } from '../services/storage/getDownloadURLFromImages'
import { firebaseTimestampToMoment } from '../utils/date'
import DiagnoseImages from '../DiagnoseImages'
import classes from '../stylesheets/admin.css'
import { getUserUIDFromDiagnoseRef } from '../utils/diagnose'

export const DiagnoseResponse = ({ query }) => {
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

  useEffect(() => {
    const attachQueryListener = () => {
      return query(onSnapshot)
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

    await writeNewResponse()

    setDiagnoses(diagnoses.filter(diagnose => diagnose.id !== currentDiagnose.id))
    setCurrentDiagnose(null)
    setIsSubmitting(false)
  }

  const fetchDiagnoseImagesAndSetAsCurrent = async (diagnose) => {
    setCurrentDiagnose(null)
    const images = await getDownloadURLFromImages(diagnose.imageReferences)
    setCurrentDiagnose({
      ...diagnose,
      images
    })
  }

  return (
    <div className={classes.row}>
      <ListGroup className={classes.column}>
        {diagnoses && diagnoses.map((diagnose, index) => (
          <ListGroup.Item action key={index} onClick={() => fetchDiagnoseImagesAndSetAsCurrent(diagnoses[index])}>
            {diagnose.id}{' '} - {diagnose.username} ({firebaseTimestampToMoment(diagnose.createdAt).format('LL')})
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className={classes.diagnoseInfoColumn}>
        {currentDiagnose && <DiagnoseInfo diagnose={currentDiagnose} />}
        {currentDiagnose && <DiagnoseResponseForm handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        {currentDiagnose && <DiagnoseImages images={currentDiagnose.images} />}
      </div>
    </div>
  )
}
