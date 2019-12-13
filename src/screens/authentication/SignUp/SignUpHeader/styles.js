import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  signUpImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    margin: theme.sizes.margin
  },
  signUpText: {
    left: theme.sizes.base,
    alignSelf: 'flex-start'
  }
})

export default styles
