import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters/extend'

export const SEND_BUTTON_ICON_WIDTH = scale(14, 1)
export const SEND_BUTTON_ICON_HEIGHT = verticalScale(30, 1)
export const INPUT_PADDING_STATIC = verticalScale(8, 1)
export const INPUT_PADDING_ON_KEYBOARD_OPENED = verticalScale(20, 1)
export const INPUT_PADDING_WITH_IMAGES = verticalScale(100, 1)

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
    borderWidth: moderateScale(1, 1),
    borderColor: '#DADADA',
    right: scale(9)
  },
  input: {
    left: scale(63),
    alignSelf: 'flex-start',
    width: scale(250),
    paddingVertical: verticalScale(8),
    marginVertical: verticalScale(8),
    color: theme.colors.black,
    ...theme.fonts.body
  },
  sendButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(33, 1),
    height: verticalScale(33, 1),
    top: verticalScale(14),
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
