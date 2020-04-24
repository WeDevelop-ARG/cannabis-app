import React from 'react'
import StatusBar from '~/components/statusBars/StatusBar'
import { theme } from '~/constants'

const BACKGROUND_COLOR = theme.colors.alpha

const TranslucentStatusBar = () => (
  <StatusBar
    lightContent
    backgroundColor={BACKGROUND_COLOR}
    translucent
  />
)

TranslucentStatusBar.setAsCurrent = () => {
  StatusBar.setBackgroundColor(BACKGROUND_COLOR, true)
  StatusBar.setLightContent()
  StatusBar.setHidden(false, true)
}

export default TranslucentStatusBar
