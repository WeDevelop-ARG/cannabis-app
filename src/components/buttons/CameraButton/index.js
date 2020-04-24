import React from 'react'
import cameraSvg from '~/assets/images/DetailedDiagnose/camera.svg'
import SvgButton from '~/components/buttons/SvgButton'
import styles, {
  CAMERA_BUTTON_ICON_WIDTH,
  CAMERA_BUTTON_ICON_HEIGHT
} from './styles'

const CameraButton = ({ onPress, style }) => {
  return (
    <SvgButton
      buttonStyle={[styles.cameraButton, style]}
      svg={cameraSvg}
      width={CAMERA_BUTTON_ICON_WIDTH}
      height={CAMERA_BUTTON_ICON_HEIGHT}
      onPress={onPress}
    />
  )
}

export default CameraButton
