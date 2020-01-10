import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: theme.sizes.margin,
    marginTop: verticalScale(24),
    marginBottom: verticalScale(76)
  }
})

export default styles
