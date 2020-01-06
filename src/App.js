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
import { theme } from '~/constants'

// console.disableYellowBox = true // releases only

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const StackNavigator = createStackNavigator({
  SignUp: { screen: SignUp },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: { title: 'Política de privacidad' }
  }
},
{
  defaultNavigationOptions: {
    headerTitleStyle: {
      ...theme.fonts.h3,
      color: theme.colors.black,
      position: 'absolute',
      left: -50,
      right: 0,
      textAlign: 'center'
    }
  }
}
)

const MainNavigator = createSwitchNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    MainApp: { screen: MainApp },
    Login: { screen: Login },
    UsernameRequest: { screen: UsernameRequest },
    Onboarding: { screen: Onboarding },
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
