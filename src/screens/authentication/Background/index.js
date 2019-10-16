import React from 'react'
import { ImageBackground } from 'react-native'
import styles from '~/screens/authentication/styles'

const Background = ({ children }) => (
  <ImageBackground
    style={styles.backgroundImage}
    source={require('~/screens/authentication/resources/background.jpg')}
  >
    {children}
  </ImageBackground>
)

export default Background
