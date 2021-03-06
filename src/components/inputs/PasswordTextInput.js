import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ThemedTextInputWithError from './ThemedTextInputWithError'
import PasswordVisibleToggle from '~/components/PasswordVisibleToggle'

const PasswordTextInput = (props) => {
  const [passwordVisible, togglePasswordVisible] = useState(false)
  const {
    placeholder,
    error,
    ...restProps
  } = props

  return (
    <View style={styles.passwordContainer}>
      <ThemedTextInputWithError
        inputStyle={styles.input}
        placeholder={placeholder}
        secureTextEntry={!passwordVisible}
        error={error}
        {...restProps}
      />
      {!error && (
        <PasswordVisibleToggle
          isVisible={passwordVisible}
          onPress={() => togglePasswordVisible(!passwordVisible)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  input: {
    width: '85%'
  }
})

PasswordTextInput.defaultProps = {
  placeholder: 'Ingresá tu contraseña'
}

export default PasswordTextInput
