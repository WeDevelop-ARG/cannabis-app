import { StyleSheet } from 'react-native'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  badge: {
    width: moderateScale(29, 1),
    height: moderateScale(29, 1),
    backgroundColor: theme.colors.black,
    borderRadius: moderateScale(29, 1) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    height: verticalScale(22),
    textAlign: 'center'
  },
  textVerticalAlignmentCenter: {
    textAlignVertical: 'center'
  },
  textVerticalAlignmentAuto: {
    textAlignVertical: 'auto'
  },
  textPaddingLeft: {
    paddingLeft: scale(1)
  },
  textPaddingRight: {
    paddingRight: scale(1)
  }
})

export default styles
