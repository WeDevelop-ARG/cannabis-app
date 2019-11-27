import 'react-native'
import * as firebase from 'firebase'
import * as AuthenticationService from '~/authenticationService'
import * as AnalyticsService from '~/analyticsService'
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

export const usernameAlreadyInUse = async (username, collectionPath = 'users') => {
  const email = await queryEmailFromUsername(username, collectionPath)

  return email !== undefined
}

export const queryEmailFromUsername = async (username, collectionPath = 'users') => {
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

export const queryUsernameFromEmail = async (email, collectionPath = 'users') => {
  try {
    const querySnapshot = await firebase.firestore().collection(collectionPath).where('email', '==', email).get()
    if (hasDocuments(querySnapshot)) {
      const json = getFirstDocumentDataFromQuerySnapshot(querySnapshot)
      return json && json.username
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
    if (!Array.isArray(imageReferences)) imageReferences = [imageReferences]

    const user = AuthenticationService.getCurrentUserUID()
    const newDiagnoseData = {
      user,
      text,
      imageReferences,
      answered: false
    }
    const newDiagnoseReference = await add(diagnosePath, newDiagnoseData)
    await addDiagnoseIDToCurrentUser(newDiagnoseReference.id)

    await AnalyticsService.logEvent('new_diagnose_request', {
      id: newDiagnoseReference.id,
      user,
      imageCount: imageReferences.length
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const getAnsweredDiagnosesForCurrentUser = async (howMany = 25, diagnosePath = 'diagnoses') => {
  try {
    const currentUserUID = AuthenticationService.getCurrentUserUID()
    const querySnapshot = await firebase
      .firestore()
      .collection(diagnosePath)
      .where('user', '==', currentUserUID)
      .where('answered', '==', true)
      .limit(howMany)
      .get()

    return querySnapshot.docs.map(doc => (doc.data()))
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const getDiagnosesFromCurrentUser = async (howMany = 25, diagnosePath = 'diagnoses') => {
  try {
    const currentUserUID = AuthenticationService.getCurrentUserUID()
    const querySnapshot = await firebase
      .firestore()
      .collection(diagnosePath)
      .where('user', '==', currentUserUID)
      .limit(howMany)
      .get()

    return querySnapshot.docs.map(doc => (doc.data()))
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const addNewUserData = async (userUID, userData) => {
  try {
    await set(`users/${userUID}`, userData)
    await AnalyticsService.logEvent('sign_up', {
      userUID,
      ...userData
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export default {
  get,
  update,
  usernameAlreadyInUse,
  queryEmailFromUsername
}
