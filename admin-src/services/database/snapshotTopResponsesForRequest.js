import * as firebase from 'firebase'

const LIMIT = 5

export const snapshotTopResponsesForRequest = (userUID, requestUID, onSnapshot) => {
  const path = `users/${userUID}/requests/${requestUID}/responses`

  try {
    return firebase
      .firestore()
      .collection(path)
      .orderBy('createdAt', 'desc')
      .limit(LIMIT)
      .onSnapshot(async (snapshot) => onSnapshot(snapshot))
  } catch (error) {
    throw new Error(error.message)
  }
}
