import { createAppContainer } from 'react-navigation'
import { includes } from 'lodash'
import MainScreen from '../screens/MainScreen'
import DescriptionRequest from '../screens/DescriptionRequest'
import FinishRequest from '../screens/FinishRequest'
import ImageReview from '../screens/ImageReview'
import NoPhotoDisclaimer from '../screens/NoPhotoDisclaimer'
import { buildStackNavigator } from '~/components/StackNavigator'

const Navigator = buildStackNavigator(
  {
    MainScreen,
    DescriptionRequest,
    FinishRequest,
    ImageReview,
    NoPhotoDisclaimer
  },
  {
    initialRouteName: 'MainScreen'
  }
)

const MainNavigator = createAppContainer(Navigator)

const allowedRoutesToShowTabBar = ['MainScreen', 'NoPhotoDisclaimer', 'FinishRequest']

MainNavigator.navigationOptions = ({ navigation }) => {
  if (navigation.state.routes.length <= 1) return {}

  const routes = navigation.state.routes
  const latestRouteName = routes[routes.length - 1].routeName
  const tabBarVisible = includes(allowedRoutesToShowTabBar, latestRouteName)

  return { tabBarVisible, swipeEnabled: tabBarVisible }
}

export default MainNavigator
