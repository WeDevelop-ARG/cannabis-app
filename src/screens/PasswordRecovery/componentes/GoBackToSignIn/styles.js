import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  text: {
    lineHeight: verticalScale(14),
    color: theme.colors.secondary
  }
})

export default styles
