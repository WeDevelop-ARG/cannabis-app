import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters/extend'

export const CAMERA_BUTTON_ICON_WIDTH = moderateScale(24, 1)
export const CAMERA_BUTTON_ICON_HEIGHT = moderateScale(19, 1)

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    left: scale(12),
    top: verticalScale(21)
  }
})

export default styles
