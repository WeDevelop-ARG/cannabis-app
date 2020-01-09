import { createAppContainer, getActiveChildNavigationOptions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../screens/MainScreen'
import DescriptionRequest from '../screens/DescriptionRequest'
import FinishRequest from '../screens/FinishRequest'
import ImageReview from '../screens/ImageReview'
import NoPhotoDisclaimer from '../screens/NoPhotoDisclaimer'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters/extend'
import { StyleSheet } from 'react-native'
import { Header } from '~/components'

const Navigator = createStackNavigator(
  {
    MainScreen,
    DescriptionRequest,
    FinishRequest,
    ImageReview,
    NoPhotoDisclaimer
  },
  {
    initialRouteName: 'MainScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.white,
        height: verticalScale(44),
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: theme.colors.black,
      headerTitle: Header,
      headerTitleStyle: {
        ...StyleSheet.absoluteFillObject,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1
      },
      headerTitleContainerStyle: {
        ...StyleSheet.absoluteFillObject
      }
    },
    navigationOptions: ({ navigation, screenProps }) => ({
      ...getActiveChildNavigationOptions(navigation, screenProps)
    })
  }
)

const MainNavigator = createAppContainer(Navigator)

MainNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  const isFirstScreen = navigation.state.index === 0

  if (!isFirstScreen) tabBarVisible = false

  return { tabBarVisible }
}

export default MainNavigator
