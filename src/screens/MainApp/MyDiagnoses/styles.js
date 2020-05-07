import { StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const activeColor = theme.colors.primary
export const inactiveColor = theme.colors.gray

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: theme.sizes.margin
  },
  flatListContainer: {
    paddingBottom: verticalScale(20),
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
  tabBarStyle: {
    backgroundColor: theme.colors.gray3
  },
  indicatorContainer: {
    marginHorizontal: scale(25)
  },
  indicatorStyle: {
    backgroundColor: theme.colors.primary,
    height: verticalScale(5),
    borderRadius: verticalScale(4),
    width: scale(140)
  },
  label: {
    ...theme.fonts.h4
  }
})

export default styles
