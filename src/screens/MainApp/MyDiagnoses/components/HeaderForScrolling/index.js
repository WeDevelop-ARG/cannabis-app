import React, { useRef, useEffect } from 'react'
import * as Animated from 'react-native-animatable'
import Subheader from '~/components/texts/Subheader'
import styles from './styles'

const TRANSITION_DURATION = 250

const HeaderForScrolling = ({ show, title = 'Mis Consultas' }) => {
  const ref = useRef()

  useEffect(() => {
    if (show) {
      ref.current.transition({ opacity: 0.0 }, { opacity: 1.0 }, TRANSITION_DURATION)
    } else {
      ref.current.transition({ opacity: 1.0 }, { opacity: 0.0 }, TRANSITION_DURATION)
    }
  }, [show])

  return (
    <Animated.View
      ref={ref}
      useNativeDriver
      style={styles.headerWhileScrolling}
    >
      <Subheader>{title}</Subheader>
    </Animated.View>
  )
}

export default HeaderForScrolling
