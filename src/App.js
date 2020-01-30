import fixtimerbug from '~/bugFixes/fixtimerbug' // this is just an import to load the fix
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import * as firebase from 'firebase'
import 'firebase/firestore'
import AppDefaultStatusBar from '~/components/statusBars/AppDefaultStatusBar'
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
import * as notificationService from '~/notificationService'

if (!__DEV__) {
  console.disableYellowBox = true
}

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

notificationService.configure()
notificationService.setNotificationHandler(() => NavigationService.navigate('MyDiagnoses'))

const App = () => (
  <>
    <AppDefaultStatusBar />
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
  </>
)

export default App
