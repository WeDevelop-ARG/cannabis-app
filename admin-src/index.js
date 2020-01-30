import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './initFirebase'
import * as firebase from 'firebase'
import { DiagnoseResponse } from './DiagnoseResponse'
import { LoginScreen } from './LoginScreen'
import { Button, Row } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

const STALE_STATUS_AFTER_DAYS = 10

const unansweredQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .where('amountOfAnswers', '==', 0)
    .onSnapshot(onSnapshot)
}
const dateDaysAgo = (daysAgo) => {
  const date = new Date(Date.now())
  date.setDate(date.getDate() - daysAgo)
  return date
}
const filterBySolved = (diagnose) => diagnose.solved
const filterByNotSolved = (diagnose) => !diagnose.solved
const filterByLastActivity = (diagnose) => (diagnose.updatedAt !== undefined) && diagnose.updatedAt.toDate() >= dateDaysAgo(STALE_STATUS_AFTER_DAYS)
const filterByAmountOfAnswers = (diagnose) => diagnose.amountOfAnswers > 0
const filterStale = (diagnose) => !filterByLastActivity(diagnose) && filterByNotSolved(diagnose) && filterByAmountOfAnswers(diagnose)
const filterInDiscussion = (diagnose) => filterByLastActivity(diagnose) && filterByNotSolved(diagnose) && filterByAmountOfAnswers(diagnose)

const inDiscussionQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .where('amountOfAnswers', '>', 0)
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterInDiscussion))
}

const staleQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .where('amountOfAnswers', '>', 0)
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterStale))
}

const solvedQuery = (onSnapshot) => {
  return firebase
    .firestore()
    .collectionGroup('requests')
    .onSnapshot(async (snapshot) => onSnapshot(snapshot, filterBySolved))
}

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const logOut = async () => {
    setUserLoggedIn(false)
    if (firebase.auth().currentUser) {
      await firebase.auth().signOut()
    }
  }

  const onUserLogin = () => setUserLoggedIn(true)

  if (userLoggedIn) {
    return (
      <>
        <Row>
          <Button onClick={logOut}>
            Log out
          </Button>
        </Row>
        <Tabs>
          <TabList>
            <Tab>New Requests</Tab>
            <Tab>In Discussion</Tab>
            <Tab>Stale</Tab>
            <Tab>Solved</Tab>
          </TabList>

          <TabPanel>
            <h2>New Requests</h2>
            <DiagnoseResponse query={unansweredQuery} />
          </TabPanel>
          <TabPanel>
            <h2>Requests in Discussion</h2>
            <DiagnoseResponse query={inDiscussionQuery} />
          </TabPanel>
          <TabPanel>
            <h2>Stale Requests</h2>
            <DiagnoseResponse query={staleQuery} />
          </TabPanel>
          <TabPanel>
            <h2>Solved Requests</h2>
            <DiagnoseResponse query={solvedQuery} />
          </TabPanel>
        </Tabs>
      </>
    )
  } else {
    return <LoginScreen onUserLogin={onUserLogin} />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
