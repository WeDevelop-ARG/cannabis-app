import 'react-native'
import * as firebase from 'firebase'

const set = async (docPath, data) => {
  try {
    await firebase.firestore().doc(docPath).set(data)
  } catch (error) {
    console.log(error.message)
  }
}

const get = async (docPath) => {
  try {
    const databaseSnapshot = await firebase.firestore().doc(docPath).get()

    return databaseSnapshot.data()
  } catch (error) {
    console.log(error.message)
  }
}

const update = async (docPath, data) => {
  try {
    await firebase.firestore().doc(docPath).update(data)
  } catch (error) {
    console.log(error.message)
  }
}

const queryEmailFromUsername = async (username, collectionPath = 'users') => {
  try {
    const querySnapshot = await firebase.firestore().collection(collectionPath).where('username', '==', username).get()
    if (hasDocuments(querySnapshot)) {
      const json = getFirstDocumentDataFromQuerySnapshot(querySnapshot)
      return json && json.email
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getFirstDocumentDataFromQuerySnapshot = (querySnapshot) => querySnapshot.docs[0].data()
const hasDocuments = (querySnapshot) => querySnapshot.size > 0

const usernameAlreadyInUse = async (username, collectionPath = 'users') => {
  const email = await queryEmailFromUsername(username, collectionPath)

  return email !== undefined
}

export default {
  set,
  get,
  update,
  usernameAlreadyInUse,
  queryEmailFromUsername
}
