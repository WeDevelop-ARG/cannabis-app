import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters/extend'
import Animated, { Easing } from 'react-native-reanimated'
import { Body } from '~/components'

const VIEW_HEIGHT = verticalScale(50)
const ANIMATION_DURATION = 500

const {
  Value,
  timing
} = Animated

const defaultStyles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    bottom: -VIEW_HEIGHT,
    backgroundColor: '#4B5057',
    height: VIEW_HEIGHT,
    width: '100%',
    paddingHorizontal: scale(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    color: 'white'
  },
  buttonTextStyle: {
    color: '#FE9458'
  }
})

const FloatingMessage = (props) => {
  const [isVisible, setIsVisible] = useState(null)
  const [transY, setTransY] = useState(new Value(0))

  const {
    text,
    buttonText,
    onButtonPressed,
    textStyle,
    buttonTextStyle,
    containerStyle,
    onHideAnimationEnd,
    visible
  } = props

  const config = {
    duration: ANIMATION_DURATION,
    easing: Easing.inOut(Easing.ease)
  }

  const containerStyles = [
    defaultStyles.containerStyle,
    containerStyle
  ]

  const textStyles = [
    defaultStyles.textStyle,
    textStyle
  ]

  const buttonTextStyles = [
    defaultStyles.buttonTextStyle,
    buttonTextStyle
  ]

  const show = () => {
    return timing(transY, { ...config, toValue: -VIEW_HEIGHT })
  }

  const hide = () => {
    return timing(transY, { ...config, toValue: VIEW_HEIGHT })
  }

  useEffect(() => {
    let anim

    if (visible) {
      anim = show()
    } else {
      anim = hide()
    }
    anim.start()
  }, [visible])

  return (
    <Animated.View
      style={[containerStyles, { transform: [{ translateY: transY }] }]}
    >
      <Body style={textStyles}>{text}</Body>
      <Body style={buttonTextStyles} onPress={(visible) ? onButtonPressed : null}>{buttonText}</Body>
    </Animated.View>
  )
}

export default FloatingMessage
