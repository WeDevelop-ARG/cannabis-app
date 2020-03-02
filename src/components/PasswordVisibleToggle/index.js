import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { moderateScale } from 'react-native-size-matters'
import { Button } from '~/components/buttons'
import { theme } from '~/constants'

const PLACEHOLDER_COLOR = theme.colors.gray
const PASSWORD_TOGGLE_ICON_SIZE = moderateScale(16, 1)

const PasswordVisibleToggle = (props) => {
  const {
    style,
    onPress,
    isVisible,
    ...restProps
  } = props

  const buttonStyle = [styles.togglePasswordButton, style]

  return (
    <Button
      onPress={onPress}
      style={buttonStyle}
      {...restProps}
    >
      <Icon
        type='font-awesome'
        name={isVisible ? 'eye-slash' : 'eye'}
        size={PASSWORD_TOGGLE_ICON_SIZE}
        color={PLACEHOLDER_COLOR}
      />
    </Button>
  )
}

const styles = StyleSheet.create({
  togglePasswordButton: {
    position: 'absolute',
    alignSelf: 'center',
    right: '10%',
    elevation: 5
  }
})

export default PasswordVisibleToggle
