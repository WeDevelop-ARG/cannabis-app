import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%'
  },
  headerWhileStatic: {
    textAlign: 'left',
    marginLeft: scale(24),
    marginTop: verticalScale(24),
    marginBottom: verticalScale(4)
  },
  headerWhileScrolling: {
    alignItems: 'center',
    paddingBottom: verticalScale(12),
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default styles
