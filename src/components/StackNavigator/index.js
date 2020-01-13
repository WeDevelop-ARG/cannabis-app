import { createStackNavigator } from 'react-navigation-stack'
import { StyleSheet } from 'react-native'
import { Header } from '~/components'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters/extend'

export const buildStackNavigator = (screens, options) => createStackNavigator(
  {
    ...screens
  },
  {
    ...options,
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
    }
  }
)
