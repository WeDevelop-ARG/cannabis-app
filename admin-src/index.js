import regeneratorRuntime from 'regenerator-runtime'
import initFirebase from './initFirebase'
import * as firebase from 'firebase'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Button, ListGroup } from 'react-bootstrap'
import { DiagnoseResponseForm } from './DiagnoseResponseForm'
import { DiagnoseInfo } from './DiagnoseInfo'
import { getDownloadURLFromImages, getUnansweredDiagnoses } from './utils'
import './stylesheets/admin.css'

const DiagnoseResponse = () => {
  const [currentDiagnose, setCurrentDiagnose] = useState(null)
  const [diagnoses, setDiagnoses] = useState([])

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

  const signalFetch = async () => {
    setDiagnoses([])
    setCurrentDiagnose(null)
    setDiagnoses(await getUnansweredDiagnoses())
  }

  return (
    <>
      <Button onClick={async () => signalFetch()}>
        Fetch diagnoses
      </Button>
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
