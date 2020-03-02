import * as firebase from 'firebase'
import { getUserUIDFromDiagnoseRef } from './getUserUIDFromDiagnoseRef'

export const buildRequestRepresentationFromDocumentSnapshot = async (request) => {
  const requestData = request.data()
  const userUID = getUserUIDFromDiagnoseRef(request.ref)
  const userSnap = await firebase.firestore().collection('users').doc(userUID).get()
  const username = userSnap.get('username')
  const requestRepresentation = {
    id: request.id,
    ref: request.ref,
    userUID,
    username,
    ...requestData
  }

  return requestRepresentation
}
