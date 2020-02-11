import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { PrimaryButton, GrayButton } from '~/components'
import { theme } from '~/constants'

const ProgressBar = ({ progress, animationDuration }) => {
  const progressAnimated = useRef(new Animated.Value(0))

  useEffect(() => {
    const animation = Animated.timing(progressAnimated.current, {
      toValue: progress,
      duration: animationDuration || 300
    })

    animation.start()

    return () => animation.stop()
  }, [progress])

  const width = progressAnimated.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp'
  })

  const styles = StyleSheet.create({
    container: StyleSheet.absoluteFillObject
  })

  return (
    <View style={styles.container}>
      <Animated.View style={{
        backgroundColor: theme.colors.primary,
        width,
        height: '100%'
      }}
      />
    </View>
  )
}

const ProgressButton = (props) => {
  const [pressed, setPressed] = useState(false)

  const {
    style,
    children,
    progress,
    onPress,
    ...restProps
  } = props

  const Button = (props.disabled) ? GrayButton : PrimaryButton

  const handlePress = () => {
    setPressed(true)
    onPress()
  }

  const buttonStyle = [
    styles.button,
    style
  ]

  if (pressed) {
    buttonStyle.push(styles.pressed)
  }

  return (
    <Button
      style={buttonStyle}
      onPress={handlePress}
      {...restProps}
    >
      <ProgressBar progress={progress} />
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden'
  },
  pressed: {
    backgroundColor: '#5B956F'
  }
})

export default ProgressButton
