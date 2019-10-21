import React from 'react'
import { ActivityIndicator } from 'react-native'

const AuthenticatingIndicator = ({ authenticating }) => (
  authenticating && <ActivityIndicator />
)

export default AuthenticatingIndicator
