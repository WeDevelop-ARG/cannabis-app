import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import './initFirebase'
import * as firebase from 'firebase'
import DiagnoseList from './DiagnoseList'
import { LoginScreen } from './LoginScreen'
import { Button, Row } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { unansweredQuery, inDiscussionQuery, staleQuery, solvedQuery, removedQuery } from './utils/queries'
import RoutedDiagnoseByURL from './RoutedDiagnoseByURL'
import classes from './styles.scss'

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const logOut = async () => {
    setUserLoggedIn(false)
    if (firebase.auth().currentUser) {
      await firebase.auth().signOut()
    }
  }

  const onUserLogin = () => setUserLoggedIn(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        onUserLogin()
      }
    })
  }, [])

  if (userLoggedIn) {
    return (
      <BrowserRouter path='/'>
        <Row bsPrefix={classes.logOutButtonContainer}>
          <Button onClick={logOut}>
            Log out
          </Button>
        </Row>
        <Tabs>
          <Switch>
            <TabList>
              <Tab className={classes.tab}>
                <Link className={classes.link} to='/new'>New Activity</Link>
              </Tab>
              <Tab className={classes.tab}>
                <Link className={classes.link} to='/discussion'>In discussion</Link>
              </Tab>
              <Tab className={classes.tab}>
                <Link className={classes.link} to='/stale'>Stale</Link>
              </Tab>
              <Tab className={classes.tab}>
                <Link className={classes.link} to='/resolved'>Closed</Link>
              </Tab>
              <Tab className={classes.tab}>
                <Link className={classes.link} to='/removed'>Removed</Link>
              </Tab>
            </TabList>
          </Switch>
          <TabPanel>
            <Route path='/new'>
              <h2>New Activity</h2>
              <DiagnoseList query={unansweredQuery} />
            </Route>
          </TabPanel>
          <TabPanel>
            <Route path='/discussion'>
              <h2>Requests in Discussion</h2>
              <DiagnoseList query={inDiscussionQuery} />
            </Route>
          </TabPanel>
          <TabPanel>
            <Route path='/stale'>
              <h2>Stale Requests</h2>
              <DiagnoseList query={staleQuery} />
            </Route>
          </TabPanel>
          <TabPanel>
            <Route path='/resolved'>
              <h2>Closed Requests</h2>
              <DiagnoseList query={solvedQuery} />
            </Route>
          </TabPanel>
          <TabPanel>
            <h2>Removed Requests</h2>
            <DiagnoseList query={removedQuery} />
          </TabPanel>
        </Tabs>
        <Route path='/:state/:userID/:requestID'>
          <RoutedDiagnoseByURL />
        </Route>
        <Route exact path='/'>
          <Redirect to='/new' />
        </Route>
      </BrowserRouter>
    )
  } else {
    return <LoginScreen onUserLogin={onUserLogin} />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
