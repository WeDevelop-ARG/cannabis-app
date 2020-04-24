import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters/extend'

export const SEND_BUTTON_ICON_WIDTH = moderateScale(14, 1)
export const SEND_BUTTON_ICON_HEIGHT = moderateScale(30, 1)
export const INPUT_PADDING_STATIC = moderateScale(8, 1)
export const INPUT_PADDING_ON_KEYBOARD_OPENED = moderateScale(20, 1)
export const INPUT_PADDING_WITH_IMAGES = moderateScale(84, 1)

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
    width: scale(316),
    padding: moderateScale(8),
    marginVertical: verticalScale(8),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.5, 1),
    borderColor: '#DADADA',
    right: scale(9)
  },
  input: {
    left: scale(63),
    alignSelf: 'flex-start',
    width: scale(250),
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
    top: verticalScale(12),
    right: scale(14),
    borderRadius: theme.sizes.border,
    backgroundColor: theme.colors.primary
  },
  cameraButton: {
    position: 'absolute',
    left: scale(12),
    top: verticalScale(21)
  },
  imageSelectionContainer: {
    position: 'relative',
    height: verticalScale(300)
  },
  galleryContainer: {
    marginTop: 0,
    zIndex: 1
  },
  newCommentImageListOnTextSubmission: {
    position: 'absolute',
    bottom: 0
  }
})

export default styles
