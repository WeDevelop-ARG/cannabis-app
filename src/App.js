import fixtimerbug from '~/bugFixes/fixtimerbug' // this is just an import to load the fix
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
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
import PrivacyPolicy from './screens/PrivacyPolicy'
import { buildStackNavigator } from '~/components/StackNavigator'

// console.disableYellowBox = true // releases only

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const StackNavigator = buildStackNavigator(
  {
    SignUp,
    PrivacyPolicy
  }
)

const MainNavigator = createSwitchNavigator(
  {
    LoadingScreen,
    MainApp,
    Login,
    UsernameRequest,
    Onboarding,
    StackNavigator
  }
)

const AppContainer = createAppContainer(MainNavigator)

const App = () => (
  <AppContainer
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)

export default App
