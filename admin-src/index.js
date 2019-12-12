import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './initFirebase'
import * as firebase from 'firebase'
import { DiagnoseResponse } from './DiagnoseResponse'
import { LoginScreen } from './LoginScreen'
import { Button, Row } from 'react-bootstrap'

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
        <DiagnoseResponse />
      </>
    )
  } else {
    return (<LoginScreen onUserLogin={onUserLogin} />)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
