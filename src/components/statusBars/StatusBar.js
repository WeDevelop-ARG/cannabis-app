import React from 'react'
import { StatusBar as ReactStatusBar, View } from 'react-native'

const StatusBar = (props) => {
  const {
    style,
    lightContent,
    darkContent,
    ...restProps
  } = props

  let contentColor = 'default'
  if (lightContent) contentColor = 'light-content'
  if (darkContent) contentColor = 'dark-content'

  return (
    <View style={style}>
      <ReactStatusBar
        animated
        barStyle={contentColor}
        {...restProps}
      />
    </View>
  )
}

StatusBar.setBackgroundColor = ReactStatusBar.setBackgroundColor
StatusBar.setDarkContent = () => ReactStatusBar.setBarStyle('dark-content', true)
StatusBar.setLightContent = () => ReactStatusBar.setBarStyle('light-content', true)
StatusBar.setTranslucent = ReactStatusBar.setTranslucent
StatusBar.setHidden = ReactStatusBar.setHidden

export default StatusBar
