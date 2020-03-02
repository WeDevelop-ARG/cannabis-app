import * as firebase from 'firebase'

export const writeNewResponse = async (answer, answeredBy, userID, requestID) => {
  const newResponse = {
    answer,
    answeredBy,
    answeredByUID: firebase.auth().currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }

  await firebase
    .firestore()
    .collection(`users/${userID}/requests/${requestID}/responses`)
    .add(newResponse)
}
