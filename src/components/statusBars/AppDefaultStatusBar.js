import React from 'react'
import StatusBar from './StatusBar'
import { theme } from '~/constants'

const BACKGROUND_COLOR = theme.colors.white

const AppDefaultStatusBar = () => (
  <StatusBar
    darkContent
    backgroundColor={BACKGROUND_COLOR}
  />
)

AppDefaultStatusBar.setAsCurrent = () => {
  StatusBar.setBackgroundColor(BACKGROUND_COLOR, true)
  StatusBar.setDarkContent()
}

export default AppDefaultStatusBar
