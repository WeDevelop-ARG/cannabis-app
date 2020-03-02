import * as firebase from 'firebase'

const STALE_STATUS_AFTER_DAYS = 10

export const unansweredQuery = (onSnapshot) => {
  firebase
    .firestore()
    .collectionGroup('requests')
    .orderBy('createdAt', 'asc')
    .where('amountOfAnswers', '==', 0)
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterUnanswered))

  return firebase
    .firestore()
    .collectionGroup('requests')
    .orderBy('updatedAt')
    .where('isLastCommentAdmin', '==', false)
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterUnanswered))
}

export const dateDaysAgo = (daysAgo) => {
  const date = new Date(Date.now())
  date.setDate(date.getDate() - daysAgo)
  return date
}

const filterBySolved = (diagnose) => diagnose.solved
const filterByNotSolved = (diagnose) => !diagnose.solved
const filterByLastActivity = (diagnose) =>
  diagnose.updatedAt !== undefined && diagnose.updatedAt.toDate() >= dateDaysAgo(STALE_STATUS_AFTER_DAYS)
const filterByAmountOfAnswers = (diagnose) => diagnose.amountOfAnswers > 0
const filterStale = (diagnose) => !filterByRemoved(diagnose) && !filterByLastActivity(diagnose) && filterByNotSolved(diagnose) && filterByAmountOfAnswers(diagnose)
const filterInDiscussion = (diagnose) => !filterByRemoved(diagnose) && filterByLastActivity(diagnose) && filterByNotSolved(diagnose) && filterByAmountOfAnswers(diagnose)
const filterUnanswered = (diagnose) => !filterByRemoved(diagnose)
const filterByRemoved = (diagnose) => (diagnose.removedAt)

export const inDiscussionQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .where('isLastCommentAdmin', '==', true)
    .orderBy('updatedAt', 'desc')
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterInDiscussion))
}

export const staleQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .where('amountOfAnswers', '>', 0)
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterStale))
}

export const solvedQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterBySolved))
}

export const removedQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterByRemoved))
}
