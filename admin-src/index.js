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

  const attachQueryListenerForUnansweredDiagnoses = () => {
    firebase
      .firestore()
      .collection('diagnoses')
      .where('answered', '==', false)
      .onSnapshot((querySnapshot) => {
        let unanswered = diagnoses
        let diagnoseOnScreen = currentDiagnose

        querySnapshot.docChanges().forEach(docChange => {
          const doc = docChange.doc
          const changeType = docChange.type

          if (changeType === 'added') {
            if (!unanswered.find(diagnose => diagnose.id === doc.id)) {
              unanswered.push({
                id: doc.id,
                ...doc.data()
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

        setDiagnoses([...unanswered])
        if (diagnoseOnScreen !== currentDiagnose) {
          setCurrentDiagnose(diagnoseOnScreen)
        }
      })
  }

  useEffect(() => attachQueryListenerForUnansweredDiagnoses(), [])

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
              {diagnose.id}
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
