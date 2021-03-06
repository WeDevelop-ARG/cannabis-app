import * as firebase from 'firebase'

export const queryAllResponsesForRequest = async (userUID, requestUID) => {
  const path = `users/${userUID}/requests/${requestUID}/responses`

  try {
    const querySnapshot = await firebase
      .firestore()
      .collection(path)
      .orderBy('createdAt', 'desc')
      .get()

    return querySnapshot.docs
  } catch (error) {
    throw new Error(error.message)
  }
}
