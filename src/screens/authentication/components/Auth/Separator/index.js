import React from 'react'
import Separator from '~/components/Separator'
import { verticalScale } from 'react-native-size-matters'

const AuthSeparator = ({ children }) => (
  <Separator style={{
    marginBottom: verticalScale(30)
  }}
  >
    {children}
  </Separator>
)

export default AuthSeparator
