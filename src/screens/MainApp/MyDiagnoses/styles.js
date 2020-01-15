import { StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: theme.sizes.margin
  },
  flatListContainer: {
    paddingBottom: verticalScale(40)
  },
  noDiagnosesActivityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    height: verticalScale(40),
    top: verticalScale(10)
  }
})

export default styles
