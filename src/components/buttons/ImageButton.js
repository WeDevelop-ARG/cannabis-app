import React from 'react'
import { Image } from 'react-native'
import Button from './Button'

const ImageButton = (props) => {
  const {
    style,
    resizeMethod,
    source,
    onPress,
    ...restProps
  } = props

  return (
    <Button
      onPress={onPress}
      {...restProps}
    >
      <Image
        style={style}
        source={source}
        resizeMethod={resizeMethod}
      />
    </Button>
  )
}

export default ImageButton
