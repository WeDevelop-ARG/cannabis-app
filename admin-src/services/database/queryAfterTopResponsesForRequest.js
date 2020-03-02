import * as firebase from 'firebase'

const LIMIT = 5

export const queryAfterTopResponsesForRequest = async (userUID, requestUID, lastCreatedAt) => {
  const path = `users/${userUID}/requests/${requestUID}/responses`

  try {
    const querySnapshot = await firebase
      .firestore()
      .collection(path)
      .orderBy('createdAt', 'desc')
      .startAfter(lastCreatedAt)
      .limit(LIMIT)
      .get()

    return querySnapshot.docs
  } catch (error) {
    throw new Error(error.message)
  }
}
