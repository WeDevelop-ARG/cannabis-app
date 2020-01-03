import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: verticalScale(21),
    right: theme.sizes.margin * 2
  }
})

export default styles
