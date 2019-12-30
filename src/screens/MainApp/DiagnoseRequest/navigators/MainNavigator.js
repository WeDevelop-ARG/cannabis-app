import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../screens/MainScreen'
import DescriptionRequest from '../screens/DescriptionRequest'
import FinishRequest from '../screens/FinishRequest'
import ImageReview from '../screens/ImageReview'
import NoPhotoDisclaimer from '../screens/NoPhotoDisclaimer'

const Navigator = createStackNavigator(
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
  let tabBarVisible = true

  if (navigation.state.index > 0) {
    tabBarVisible = false
  }

  return { tabBarVisible }
}

export default MainNavigator
