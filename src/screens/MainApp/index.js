import React from 'react'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Profile from './Profile'
import DiagnoseRequest from './DiagnoseRequest'
import MyDiagnoses from './MyDiagnoses'
import styles from './styles'
import MyDiagnosesIcon from './resources/tabIcons/DiagnoseRequestTabSVG'
import DiagnoseRequestIcon from './resources/tabIcons/MyDiagnosesTabSVG'
import ProfileIcon from './resources/tabIcons/ProfileTabSVG'
import { theme } from '~/constants'

const MainApp = createBottomTabNavigator(
  {
    DiagnoseRequest: {
      screen: DiagnoseRequest,
      navigationOptions: {
        tabBarLabel: 'Solicitar',
        tabBarIcon: ({ tintColor }) => (
          <MyDiagnosesIcon tintColor={tintColor} />
        )
      }
    },
    MyDiagnoses: {
      screen: MyDiagnoses,
      navigationOptions: {
        tabBarLabel: 'Mis Solicitudes',
        tabBarIcon: ({ tintColor }) => (
          <DiagnoseRequestIcon tintColor={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ tintColor }) => (
          <ProfileIcon tintColor={tintColor} />
        )
      }
    }
  }, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.gray,
      style: styles.tabBarStyle,
      indicatorStyle: styles.indicatorStyle,
      showIcon: true
    },
    initialRouteName: 'DiagnoseRequest'
  }
)

export default MainApp
