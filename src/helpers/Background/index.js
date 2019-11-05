import React from 'react'
import { ImageBackground } from 'react-native'
import styles from './styles'
import source from './resources/background.jpg'

const Background = ({ children }) => (
  <ImageBackground
    style={styles.backgroundImage}
    source={source}
  >
    {children}
  </ImageBackground>
)

export default Background
