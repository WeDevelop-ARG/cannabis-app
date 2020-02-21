import { StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: theme.sizes.margin
  },
  flatListContainer: {
    marginBottom: verticalScale(40),
    width: '100%'
  },
  noDiagnosesActivityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    height: verticalScale(40),
    top: verticalScale(10)
  },
  hiddenField: {
    backgroundColor: '#D85353',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: scale(33)
  },
  toast: {
    color: 'white'
  },
  swipeRow: {

  }
})

export default styles
