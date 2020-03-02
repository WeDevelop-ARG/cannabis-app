import { createAppContainer } from 'react-navigation'
import { includes } from 'lodash'
import MainScreen from '../screens/MainScreen'
import DescriptionRequest from '../screens/DescriptionRequest'
import FinishRequest from '../screens/FinishRequest'
import ImageReview from '../screens/ImageReview'
import NoPhotoDisclaimer from '../screens/NoPhotoDisclaimer'
import Gallery from '../screens/Gallery'
import { buildStackNavigator } from '~/components/StackNavigator'

const Navigator = buildStackNavigator(
  {
    MainScreen,
    DescriptionRequest,
    FinishRequest,
    ImageReview,
    Gallery,
    NoPhotoDisclaimer
  },
  {
    initialRouteName: 'MainScreen'
  }
)

const MainNavigator = createAppContainer(Navigator)

const allowedRoutesToShowTabBar = ['MainScreen', 'NoPhotoDisclaimer', 'FinishRequest']

MainNavigator.navigationOptions = ({ navigation }) => {
  const routes = navigation.state.routes
  const latestRouteName = routes[routes.length - 1].routeName
  const tabBarVisible = includes(allowedRoutesToShowTabBar, latestRouteName)

  return { tabBarVisible, swipeEnabled: tabBarVisible }
}

export default MainNavigator
