import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  badge: {
    width: moderateScale(27, 1),
    height: moderateScale(27, 1),
    backgroundColor: theme.colors.black,
    borderRadius: moderateScale(27, 1) / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
