import React from 'react'
import { firebaseTimestampToMoment } from '../utils/date'
import Responses from './components/Responses'

export const DiagnoseInfo = ({ diagnose }) => {
  return (
    <div>
      <div>
        DIAGNOSE UID: {diagnose.id}
      </div>
      <div>
        CREATED AT: {firebaseTimestampToMoment(diagnose.createdAt).format('LLL')}
      </div>
      <div>
        USERNAME: {diagnose.username}
      </div>
      <div>
        DESCRIPTION: {diagnose.text}
      </div>
      <Responses diagnose={diagnose} />
      {diagnose.imagesSources && diagnose.imagesSources.map((imageSource, index) => (
        <img key={index} className='diagnose-image' src={imageSource} />
      ))}
    </div>
  )
}
