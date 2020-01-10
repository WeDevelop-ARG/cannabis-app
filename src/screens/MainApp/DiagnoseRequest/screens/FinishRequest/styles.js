import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.sizes.margin * 2
  },
  logo: {
    marginTop: verticalScale(64)
  },
  button: {
    marginTop: verticalScale(43)
  },
  title: {
    marginTop: verticalScale(32)
  },
  description: {
    textAlign: 'center',
    marginTop: verticalScale(12)
  }
})

export default styles
