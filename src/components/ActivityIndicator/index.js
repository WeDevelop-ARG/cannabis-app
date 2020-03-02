import React from 'react'
import { ActivityIndicator as ReactActivityIndicator, View } from 'react-native'

const ActivityIndicator = (props) => {
  const {
    animating,
    color,
    hidesWhenStopped,
    size,
    ...restProps
  } = props

  return (
    <View {...restProps}>
      <ReactActivityIndicator
        animating={animating}
        color={color}
        hidesWhenStopped={hidesWhenStopped}
        size={size}
      />
    </View>
  )
}

export default ActivityIndicator
