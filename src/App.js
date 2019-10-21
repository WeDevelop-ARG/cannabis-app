import fixtimerbug from '~/bugFixes/fixtimerbug' // this is just an import to load the fix
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import * as firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './configs/firebase'
import NavigationService from './navigationService'
import SignUp from './screens/authentication/SignUp'
import Login from './screens/authentication/Login'
import Home from './screens/MainApp/Home'
import LoadingScreen from './screens/LoadingScreen'
import DiagnoseRequest from './screens/MainApp/DiagnoseRequest'
import DiagnoseResponse from './screens/MainApp/DiagnoseResponse'
import Settings from './screens/MainApp/Settings'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const MainApp = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
      tabBarLabel: 'Principal'
    }
  },
  DiagnoseRequest: {
    screen: DiagnoseRequest,
    navigationOptions: {
      headerTitle: 'DiagnoseRequest',
      tabBarLabel: 'Diagnosticar'
    }
  },
  DiagnoseResponse: {
    screen: DiagnoseResponse,
    navigationOptions: {
      headerTitle: 'DiagnoseResponse',
      tabBarLabel: 'Diagnósticos'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings',
      tabBarLabel: 'Opciones'
    }
  }
})

const MainNavigator = createSwitchNavigator({
  LoadingScreen: { screen: LoadingScreen },
  MainApp: { screen: MainApp },
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
