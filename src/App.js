import fixtimerbug from '~/bugFixes/fixtimerbug' // this is just an import to load the fix
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './configs/firebase'
import NavigationService from './navigationService'
import SignUp from './screens/authentication/SignUp'
import Login from './screens/authentication/Login'
import UsernameRequest from './screens/authentication/UsernameRequest'
import LoadingScreen from './screens/LoadingScreen'
import Onboarding from './screens/Onboarding'
import MainApp from './screens/MainApp'

// console.disableYellowBox = true // releases only

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const MainNavigator = createSwitchNavigator({
  LoadingScreen: { screen: LoadingScreen },
  MainApp: { screen: MainApp },
  SignUp: { screen: SignUp },
  Login: { screen: Login },
  UsernameRequest: { screen: UsernameRequest },
  Onboarding: { screen: Onboarding }
})

const AppContainer = createAppContainer(MainNavigator)

const App = () => (
  <AppContainer
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)

export default App
