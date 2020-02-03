import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  headerWhileScrolling: {
    alignItems: 'center',
    position: 'absolute',
    paddingVertical: verticalScale(12),
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    elevation: 1
  }
})

export default styles
