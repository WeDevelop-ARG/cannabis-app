import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = (props) => {
  const {
    style,
    children,
    ...restProps
  } = props

  return (
    <TouchableOpacity
      style={style}
      {...restProps}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Button
