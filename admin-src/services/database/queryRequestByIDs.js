import * as firebase from 'firebase'

export const queryRequestByIDs = async (userID, requestID) => {
  const requestSnap = await firebase.firestore().doc(`users/${userID}/requests/${requestID}`).get()

  return requestSnap
}
