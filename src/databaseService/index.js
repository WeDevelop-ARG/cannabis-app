import 'react-native'
import * as firebase from 'firebase'
import * as AuthenticationService from '~/authenticationService'
import DatabaseError from '~/AppErrors/DatabaseError'

const set = async (docPath, data) => {
  try {
    await firebase.firestore().doc(docPath).set({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const get = async (docPath) => {
  try {
    const databaseSnapshot = await firebase.firestore().doc(docPath).get()

    return databaseSnapshot.data()
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const update = async (docPath, data) => {
  try {
    await firebase.firestore().doc(docPath).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const add = async (collectionPath, data) => {
  try {
    return firebase.firestore().collection(collectionPath).add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const usernameAlreadyInUse = async (username, collectionPath = 'users') => {
  const email = await queryEmailFromUsername(username, collectionPath)

  return email !== undefined
}

const queryEmailFromUsername = async (username, collectionPath = 'users') => {
  try {
    const querySnapshot = await firebase.firestore().collection(collectionPath).where('username', '==', username).get()
    if (hasDocuments(querySnapshot)) {
      const json = getFirstDocumentDataFromQuerySnapshot(querySnapshot)
      return json && json.email
    }
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const getFirstDocumentDataFromQuerySnapshot = (querySnapshot) => querySnapshot.docs[0].data()

const hasDocuments = (querySnapshot) => querySnapshot.size > 0

const addDiagnoseIDToCurrentUser = async (diagnoseID, collectionPath = 'users') => {
  try {
    const currentUserUUID = AuthenticationService.getCurrentUserUID()
    await update(`${collectionPath}/${currentUserUUID}`, {
      diagnoses: firebase.firestore.FieldValue.arrayUnion(diagnoseID)
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const addDiagnose = async (imageReferences, text, diagnosePath = 'diagnoses') => {
  try {
    const user = AuthenticationService.getCurrentUserUID()
    const newDiagnoseData = {
      user,
      text,
      imageReferences
    }
    const newDiagnoseReference = await add(diagnosePath, newDiagnoseData)
    await addDiagnoseIDToCurrentUser(newDiagnoseReference)
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export default {
  set,
  get,
  update,
  usernameAlreadyInUse,
  queryEmailFromUsername
}
