import * as firebase from 'firebase'

export const queryAllResponsesForRequest = async (userUID, requestUID) => {
  const path = `users/${userUID}/requests/${requestUID}/responses`

  try {
    const querySnapshot = await firebase
      .firestore()
      .collection(path)
      .orderBy('createdAt', 'desc')
      .get()

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    throw new Error(error.message)
  }
}
