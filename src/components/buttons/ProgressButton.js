import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { PrimaryButton, GrayButton } from '~/components'
import { theme } from '~/constants'

const ProgressBar = ({ progress }) => {
  const styles = StyleSheet.create({
    container: StyleSheet.absoluteFillObject,
    overlay: {
      backgroundColor: theme.colors.primary,
      width: `${progress}%`,
      height: '100%'
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
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
