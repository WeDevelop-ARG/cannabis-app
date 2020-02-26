import React from 'react'
import StatusBar from '~/components/statusBars/StatusBar'
import { theme } from '~/constants'

const BACKGROUND_COLOR = theme.colors.alpha

const StatusBarForCarousel = () => (
  <StatusBar
    lightContent
    backgroundColor={BACKGROUND_COLOR}
    translucent
  />
)

StatusBarForCarousel.setAsCurrent = () => {
  StatusBar.setBackgroundColor(BACKGROUND_COLOR, true)
  StatusBar.setLightContent()
  StatusBar.setHidden(false, true)
}

StatusBarForCarousel.setHidden = StatusBar.setHidden

export default StatusBarForCarousel
