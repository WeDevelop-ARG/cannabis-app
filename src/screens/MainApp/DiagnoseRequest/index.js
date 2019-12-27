import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from './MainScreen'

const Navigator = createStackNavigator(
  {
    MainScreen
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none'
  }
)

const DiagnoseRequest = createAppContainer(Navigator)

DiagnoseRequest.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true

  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return { tabBarVisible }
}

export default DiagnoseRequest
