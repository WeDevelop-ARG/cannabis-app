import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Settings from './Settings'
import DiagnoseRequest from './DiagnoseRequest'
import styles from './styles'

const MainApp = createBottomTabNavigator(
  {
    DiagnoseRequest: {
      screen: DiagnoseRequest,
      navigationOptions: {
        tabBarLabel: 'Solicitar',
        tabBarIcon: ({ tintColor }) => (
          <Icon type='font-awesome' name='upload' size={18} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ tintColor }) => (
          <Icon type='font-awesome' name='user-circle' size={18} color={tintColor} />
        )
      }
    }
  }, {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
      style: styles.tabBarStyle
    }
  }
)

export default MainApp