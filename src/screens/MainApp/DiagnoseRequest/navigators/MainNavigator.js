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

MainNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible
  const allowedRoutesToShowTabBar = ['MainScreen', 'NoPhotoDisclaimer', 'FinishRequest']

  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (includes(allowedRoutesToShowTabBar, route.routeName)) {
        tabBarVisible = true
      } else {
        tabBarVisible = false
      }
    })
  }

  return { tabBarVisible }
}

export default MainNavigator
