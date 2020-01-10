import React from 'react'
import { View } from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack'

const BackButton = (props) => {
  const {
    onPress,
    style,
    color,
    ...restProps
  } = props

  return (
    <View style={style}>
      <HeaderBackButton
        onPress={onPress}
        tintColor={color}
        {...restProps}
      />
    </View>
  )
}

export default BackButton
