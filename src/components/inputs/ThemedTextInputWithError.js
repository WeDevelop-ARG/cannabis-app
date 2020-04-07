import React from 'react'
import { StyleSheet, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters/extend'
import ThemedTextInput from './ThemedTextInput'
import ErrorSignal from '../ErrorSignal'
import { theme } from '~/constants'

const ThemedTextInputWithError = (props) => {
  const {
    borderStyle,
    error,
    ...restProps
  } = props

  const borderStyles = [borderStyle]
  if (error) {
    borderStyles.push(styles.errorBorder)
  }

  return (
    <View style={styles.container}>
      <ThemedTextInput
        borderStyle={borderStyles}
        {...restProps}
      />
      {error && (
        <ErrorSignal
          style={styles.error}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  error: {
    alignSelf: 'center',
    elevation: 1,
    position: 'absolute',
    right: '11%'
  },
  errorBorder: {
    borderColor: theme.colors.error,
    borderWidth: moderateScale(2, 1)
  }
})

export default ThemedTextInputWithError
