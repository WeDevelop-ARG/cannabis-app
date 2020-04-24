import React from 'react'
import StatusBar from '~/components/statusBars/StatusBar'
import { theme } from '~/constants'

const BACKGROUND_COLOR = theme.colors.alpha

const StatusBarForFullScreenImagesView = () => (
  <StatusBar
    lightContent
    backgroundColor={BACKGROUND_COLOR}
    translucent
  />
)

export default StatusBarForFullScreenImagesView
