import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './initFirebase'
import * as firebase from 'firebase'
import { DiagnoseResponse } from './DiagnoseResponse'
import { LoginScreen } from './LoginScreen'
import { Button, Row } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { unansweredQuery, inDiscussionQuery, staleQuery, solvedQuery, removedQuery } from './utils/queries'

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
            <Tab>Removed</Tab>
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
          <TabPanel>
            <h2>Removed Requests</h2>
            <DiagnoseResponse query={removedQuery} />
          </TabPanel>
        </Tabs>
      </>
    )
  } else {
    return <LoginScreen onUserLogin={onUserLogin} />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
