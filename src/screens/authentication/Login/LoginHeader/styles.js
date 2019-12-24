import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  loginImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    right: theme.sizes.padding,
    margin: theme.sizes.margin
  },
  loginText: {
    left: theme.sizes.base,
    alignSelf: 'flex-start'
  }
})

export default styles
