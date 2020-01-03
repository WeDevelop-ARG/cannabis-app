import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    width: theme.sizes.containerWidth
  },
  text: {
    alignSelf: 'center',
    paddingHorizontal: theme.sizes.margin,
    backgroundColor: theme.colors.gray3
  },
  line: {
    top: verticalScale(14),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray
  }
})

export default styles
