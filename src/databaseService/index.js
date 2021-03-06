import 'react-native'
import * as firebase from 'firebase'
import * as AuthenticationService from '~/authenticationService'
import * as AnalyticsService from '~/analyticsService'
import DatabaseError from '~/AppErrors/DatabaseError'
import { getRequestOpenTimestamp } from '../cacheService/requestOpenTimestamp/getRequestOpenTimestamp'

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

export const findUsersWithUsernames = async (usernames, collectionPath = 'users') => {
  try {
    const querySnapshot = await firebase.firestore().collection(collectionPath).where('username', 'in', usernames).get()
    if (hasDocuments(querySnapshot)) {
      const usedUsernameArray = querySnapshot.docs.map(d => d.data().username)

      return usedUsernameArray
    }
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const getFirstDocumentDataFromQuerySnapshot = (querySnapshot) => querySnapshot.docs[0].data()

const hasDocuments = (querySnapshot) => querySnapshot.size > 0

export const addDiagnose = async (imageReferences, text) => {
  try {
    if (!Array.isArray(imageReferences)) imageReferences = [imageReferences]

    const user = AuthenticationService.getCurrentUserUID()
    const diagnosePath = `users/${user}/requests`
    const newDiagnoseData = {
      user,
      text,
      imageReferences,
      amountOfAnswers: 0,
      removedAt: 0,
      isSolved: false
    }
    const newDiagnoseReference = await add(diagnosePath, newDiagnoseData)

    await AnalyticsService.logEvent('new_diagnose_request', {
      id: newDiagnoseReference.id,
      user,
      imageCount: imageReferences.length
    })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

const getDocumentsFromCollectionOrderedByCreationDate = async (path) => {
  try {
    const querySnapshot = await firebase
      .firestore()
      .collection(path)
      .orderBy('createdAt', 'desc')
      .get()

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const getResponsesForDiagnose = async (diagnoseUID) => {
  try {
    const currentUserUID = AuthenticationService.getCurrentUserUID()
    const responsePath = `users/${currentUserUID}/requests/${diagnoseUID}/responses`

    return await getDocumentsFromCollectionOrderedByCreationDate(responsePath)
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const getDiagnosesFromCurrentUser = async () => {
  try {
    const currentUserUID = AuthenticationService.getCurrentUserUID()
    const diagnosePath = `users/${currentUserUID}/requests`

    return await getDocumentsFromCollectionOrderedByCreationDate(diagnosePath)
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

export const addDiagnoseResponse = async (diagnoseUID, response) => {
  try {
    const userUID = AuthenticationService.getCurrentUserUID()
    const responsePath = `users/${userUID}/requests/${diagnoseUID}/responses`

    const responseData = {
      answer: response.answer,
      answeredByUID: userUID,
      imageReferences: response.imageReferences || []
    }

    const responseReference = await add(responsePath, responseData)
    const responseFetch = await responseReference.get()

    return { id: responseFetch.id, ...responseFetch.data() }
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const getUsernameByUID = async (userUID) => {
  try {
    const { username } = await get(`users/${userUID}`)

    return username
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const fetchDiagnosesFromCurrentUser = (onSnapshot) => {
  const userUID = AuthenticationService.getCurrentUserUID()
  return firebase
    .firestore()
    .collection(`users/${userUID}/requests`)
    .where('removedAt', '==', 0)
    .orderBy('createdAt', 'asc')
    .onSnapshot(onSnapshot)
}

export const setDiagnoseRemovedMark = async (diagnoseUID, isRemoved) => {
  try {
    const userUID = AuthenticationService.getCurrentUserUID()
    const removedData = {
      removedAt: (isRemoved) ? firebase.firestore.FieldValue.serverTimestamp() : 0
    }

    return await update(`users/${userUID}/requests/${diagnoseUID}`, removedData)
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const setDiagnoseSolvedMark = async (diagnoseUID, isSolved) => {
  try {
    const userUID = AuthenticationService.getCurrentUserUID()

    return await update(`users/${userUID}/requests/${diagnoseUID}`, { isSolved: !!isSolved })
  } catch (error) {
    throw new DatabaseError(error.message)
  }
}

export const getUnreadCommentCountForRequest = async (requestID) => {
  let count

  try {
    const currentUserUID = AuthenticationService.getCurrentUserUID()
    const responsePath = `users/${currentUserUID}/requests/${requestID}/responses`
    const lastOpenTimestamp = await getRequestOpenTimestamp(requestID)
    let unreadComments = []

    if (lastOpenTimestamp) {
      const responsesAfterOpenDateSnapshot = await firebase
        .firestore()
        .collection(responsePath)
        .orderBy('createdAt', 'asc')
        .startAfter(new Date(lastOpenTimestamp))
        .get()

      unreadComments = responsesAfterOpenDateSnapshot.docs.filter(doc => doc.data().answeredByUID !== currentUserUID)
    } else {
      const responsesAfterOpenDateSnapshot = await firebase
        .firestore()
        .collection(responsePath)
        .orderBy('createdAt', 'asc')
        .get()

      unreadComments = responsesAfterOpenDateSnapshot.docs
    }

    count = unreadComments.length
  } catch (error) {
    count = 0
  }

  return count
}

export default {
  get,
  update,
  usernameAlreadyInUse,
  queryEmailFromUsername
}
