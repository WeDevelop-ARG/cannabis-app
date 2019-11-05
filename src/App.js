import fixtimerbug from '~/bugFixes/fixtimerbug' // this is just an import to load the fix
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import * as firebase from 'firebase'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome5'
import firebaseConfig from './configs/firebase'
import NavigationService from './navigationService'
import SignUp from './screens/authentication/SignUp'
import Login from './screens/authentication/Login'
import Home from './screens/MainApp/Home'
import LoadingScreen from './screens/LoadingScreen'
import PrivacyPolicy from './screens/PrivacyPolicy'
import DiagnoseRequest from './screens/MainApp/DiagnoseRequest'
import DiagnoseResponse from './screens/MainApp/DiagnoseResponse'
import Settings from './screens/MainApp/Settings'
import styles from './styles'

// console.disableYellowBox = true // releases only

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const MainApp = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
      tabBarLabel: 'Diagnósticos',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='cannabis' size={18} color={tintColor} />
      )
    }
  },
  DiagnoseRequest: {
    screen: DiagnoseRequest,
    navigationOptions: {
      headerTitle: 'DiagnoseRequest',
      tabBarLabel: 'Diagnosticar',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='comment-medical' size={18} color={tintColor} />
      )
    }
  },
  DiagnoseResponse: {
    screen: DiagnoseResponse,
    navigationOptions: {
      headerTitle: 'DiagnoseResponse',
      tabBarLabel: 'Respuestas',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='microscope' size={18} color={tintColor} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings',
      tabBarLabel: 'Opciones',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='cog' size={18} color={tintColor} />
      )
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'green',
    inactiveTintColor: 'gray',
    style: styles.tabBarStyle
  }
})

const MainNavigator = createSwitchNavigator({
  LoadingScreen: { screen: LoadingScreen },
  PrivacyPolicy: { screen: PrivacyPolicy },
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
