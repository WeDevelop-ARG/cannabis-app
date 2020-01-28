import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale, moderateScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  informationContainer: {
    flex: 1,
    width: theme.sizes.containerWidth,
    alignSelf: 'center',
    top: verticalScale(-40)
  },
  metadataContainer: {
    top: verticalScale(-40),
    width: theme.sizes.containerWidth,
    height: verticalScale(80),
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: verticalScale(17),
    marginBottom: verticalScale(32),
    borderRadius: moderateScale(12),
    backgroundColor: theme.colors.white,
    elevation: 5
  },
  metadataAsColumn: {
    flex: 1,
    height: '65%',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default styles
