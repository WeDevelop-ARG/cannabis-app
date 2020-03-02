import React from 'react'
import { firebaseTimestampToMoment } from '../utils/date'

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
    </div>
  )
}
