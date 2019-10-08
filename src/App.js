import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import NavigationService from './navigationService'
import SignUp from './screens/SignUp'
import Home from './screens/Home'
import LoadingScreen from './screens/LoadingScreen'
import * as firebase from 'firebase'
import firebaseConfig from './configs/firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const MainNavigator = createSwitchNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Home: { screen: Home },
  SignUp: { screen: SignUp }
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
