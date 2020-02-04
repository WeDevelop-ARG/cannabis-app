import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters/extend'

export const SEND_BUTTON_ICON_WIDTH = moderateScale(14, 1)
export const SEND_BUTTON_ICON_HEIGHT = moderateScale(30, 1)
export const INPUT_PADDING_STATIC = moderateScale(8, 1)
export const INPUT_PADDING_ON_KEYBOARD_OPENED = moderateScale(20, 1)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    bottom: 0,
    borderWidth: moderateScale(1, 1),
    borderColor: '#F0F0F0',
    backgroundColor: theme.colors.white
  },
  inputBorders: {
    position: 'absolute',
    height: verticalScale(45),
    width: scale(357),
    padding: moderateScale(8),
    margin: theme.sizes.margin * 2,
    marginVertical: verticalScale(8),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.5, 1),
    borderColor: '#DADADA'
  },
  input: {
    alignSelf: 'flex-start',
    width: scale(310),
    marginHorizontal: theme.sizes.margin,
    paddingVertical: moderateScale(8),
    marginVertical: verticalScale(8),
    color: theme.colors.black,
    ...theme.fonts.body
  },
  sendButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(33, 1),
    height: moderateScale(35, 1),
    top: verticalScale(13),
    right: scale(14),
    borderRadius: theme.sizes.border,
    backgroundColor: theme.colors.primary
  }
})

export default styles
