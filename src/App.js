import '~/bugFixes/fixtimerbug' // this is just an import to load the fix
import '~/bugFixes/disableImpossibleToFixWarnings' // this is just an import to load the fix
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
import PasswordRecovery from './screens/PasswordRecovery'
import PrivacyPolicy from './screens/PrivacyPolicy'
import NoConnection from './screens/NoConnection'
import NoConnectionAtStart from './screens/NoConnectionAtStart'
import { buildStackNavigator } from '~/components/StackNavigator'
import * as notificationService from '~/notificationService'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

if (!__DEV__) {
  console.disableYellowBox = true
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const StackNavigator = buildStackNavigator(
  {
    Login,
    SignUp,
    PrivacyPolicy,
    PasswordRecovery,
    NoConnection
  }
)

const MainNavigator = createSwitchNavigator(
  {
    LoadingScreen,
    MainApp,
    UsernameRequest,
    Onboarding,
    StackNavigator,
    NoConnectionAtStart
  }
)

const AppContainer = createAppContainer(MainNavigator)

notificationService.configure()
notificationService.setNotificationHandler(() => NavigationService.navigate('MyDiagnoses'))

const App = () => (
  <>
    <AppDefaultStatusBar />
    <ActionSheetProvider>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    </ActionSheetProvider>
  </>
)

export default App
