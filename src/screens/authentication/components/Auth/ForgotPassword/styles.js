import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(37)
  },
  text: {
    fontSize: scale(14),
    color: theme.colors.secondary
  }
})

export default styles
