import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import NavigationService from './navigationService'
import SignUp from './screens/authentication/SignUp'
import Login from './screens/authentication/Login'
import Home from './screens/Home'
import LoadingScreen from './screens/LoadingScreen'
import * as firebase from 'firebase'
import firebaseConfig from './configs/firebase'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const MainNavigator = createSwitchNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Home: { screen: Home },
  SignUp: { screen: SignUp },
  Login: { screen: Login }
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
