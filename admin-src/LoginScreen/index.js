import React, { useState } from 'react'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Button, Modal } from 'react-bootstrap'
import { userHasAccess } from '../utils'

const WrongUserDialog = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Usuario incorrecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>El usuario no tiene privilegios para ingresar</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export const LoginScreen = ({ onUserLogin }) => {
  const [showWrongUserDialog, setShowWrongUserDialog] = useState(false)

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
        if (await userHasAccess(authResult)) {
          onUserLogin()
        } else {
          if (firebase.auth().currentUser) {
            await firebase.auth().signOut()
          }
          setShowWrongUserDialog(true)
        }
        return true
      }
    },
    signInSuccessUrl: '#',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  }

  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <WrongUserDialog show={showWrongUserDialog} close={() => window.location.replace('./')} />
    </>
  )
}
