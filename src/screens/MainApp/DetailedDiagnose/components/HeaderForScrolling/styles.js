import { StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    top: verticalScale(12),
    backgroundColor: theme.colors.white,
    elevation: 1,
    opacity: 0,
    zIndex: 1
  },
  backButton: {
    marginLeft: scale(8)
  },
  metadataContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1
  },
  metadataAsRow: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  verticalLine: {
    height: verticalScale(21)
  }
})

export default styles
