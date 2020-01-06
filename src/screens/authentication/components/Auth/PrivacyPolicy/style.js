import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    width: theme.sizes.containerWidth,
    position: 'absolute',
    top: verticalScale(570)
  },
  policyText: {
    textAlign: 'center'
  }
})

export default styles
