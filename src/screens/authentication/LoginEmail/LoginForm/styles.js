import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  loginError: {
    textAlign: 'center'
  },
  loginForm: {
    width: widthPercentageToDP('75%'),
    margin: theme.sizes.margin
  },
  loginButton: {
    alignSelf: 'center'
  },
  label: {
    margin: theme.sizes.margin / 2,
    padding: theme.sizes.padding / 2,
    paddingLeft: theme.sizes.padding,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    textDecorationLine: 'none',
    borderRadius: theme.sizes.border
  }
})

export default styles
