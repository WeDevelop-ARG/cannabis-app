import initFirebase from './initFirebase'
import * as firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ListGroup } from 'react-bootstrap'
import { DiagnoseResponseForm } from './DiagnoseResponseForm'
import { DiagnoseInfo } from './DiagnoseInfo'
import { getDownloadURLFromImages } from './utils'
import './stylesheets/admin.css'

const DiagnoseResponse = () => {
  const [currentDiagnose, setCurrentDiagnose] = useState(null)
  const [diagnoses, setDiagnoses] = useState([])

  useEffect(() => {
    const attachQueryListenerForUnansweredDiagnoses = () => {
      firebase
        .firestore()
        .collection('diagnoses')
        .where('answered', '==', false)
        .onSnapshot(async (querySnapshot) => {
          let unanswered = diagnoses
          let diagnoseOnScreen = currentDiagnose

          await Promise.all(
            querySnapshot.docChanges().map(async docChange => {
              const doc = docChange.doc
              const changeType = docChange.type

              if (changeType === 'added') {
                if (!unanswered.find(diagnose => diagnose.id === doc.id)) {
                  const docData = doc.data()
                  const userSnap = await firebase.firestore().collection('users').doc(docData.user).get()
                  const username = userSnap.data().username
                  unanswered.push({
                    id: doc.id,
                    username,
                    ...docData
                  })
                }
              }

              if (changeType === 'removed') {
                unanswered = unanswered.filter(diagnose => diagnose.id !== doc.id)
                if (diagnoseOnScreen && diagnoseOnScreen.id === doc.id) {
                  diagnoseOnScreen = null
                }
              }
            })
          )

          setDiagnoses([...unanswered])
          setCurrentDiagnose(diagnoseOnScreen)
        })
    }

    attachQueryListenerForUnansweredDiagnoses()
  }, [])

  const handleSubmit = async (values) => {
    const dataToUpdate = {
      answer: values.answer,
      answeredBy: values.answeredBy,
      answered: true,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    await firebase.firestore().collection('diagnoses').doc(currentDiagnose.id).update(dataToUpdate)
    setDiagnoses(diagnoses.filter(diagnose => diagnose.id !== currentDiagnose.id))
    setCurrentDiagnose(null)
  }

  const fetchDiagnoseImagesAndSetAsCurrent = async (diagnose) => {
    const imagesSources = await getDownloadURLFromImages(diagnose.imageReferences)
    setCurrentDiagnose({
      ...diagnose,
      imagesSources
    })
  }

  return (
    <>
      <div className='row'>
        <ListGroup className='column'>
          {diagnoses && diagnoses.map((diagnose, index) => (
            <ListGroup.Item action key={index} onClick={() => fetchDiagnoseImagesAndSetAsCurrent(diagnoses[index])}>
              {diagnose.id}{' '} - {diagnose.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className='diagnose-info-column'>
          {currentDiagnose && <DiagnoseInfo diagnose={currentDiagnose} />}
        </div>
        <div className='column'>
          {currentDiagnose && <DiagnoseResponseForm handleSubmit={handleSubmit} />}
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<DiagnoseResponse />, document.getElementById('root'))
