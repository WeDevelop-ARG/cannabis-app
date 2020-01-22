import React from 'react'
import { StatusBar, View } from 'react-native'

const MyStatusBar = (props) => {
  const {
    style,
    lightContent,
    darkContent,
    ...restProps
  } = props

  let contentColor
  contentColor = (lightContent) ? 'light-content' : 'default'
  contentColor = (darkContent) ? 'dark-content' : 'default'

  return (
    <View style={style}>
      <StatusBar
        animated
        barStyle={contentColor}
        {...restProps}
      />
    </View>
  )
}

MyStatusBar.setBackgroundColor = StatusBar.setBackgroundColor
MyStatusBar.setDarkContent = () => StatusBar.setBarStyle('dark-content', true)
MyStatusBar.setLightContent = () => StatusBar.setBarStyle('light-content', true)
MyStatusBar.setTranslucent = StatusBar.setTranslucent

export default MyStatusBar
