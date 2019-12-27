import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from './MainScreen'
import DescriptionRequest from './DescriptionRequest'
import FinishRequest from './FinishRequest'
import ImageReview from './ImageReview'

const Navigator = createStackNavigator(
  {
    MainScreen,
    DescriptionRequest,
    FinishRequest,
    ImageReview
  },
  {
    initialRouteName: 'MainScreen'
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
