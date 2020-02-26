import React, { useEffect, useRef } from 'react'
import * as Animated from 'react-native-animatable'
import StatusBar from '~/components/statusBars/StatusBar'
import { theme } from '~/constants'

const TRANSITION_DURATION = 100
const BACKGROUND_COLOR = theme.colors.white

const StatusBarOnScroll = ({ show }) => {
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
      style={{ opacity: 0 }}
    >
      <StatusBar
        darkContent
        backgroundColor={BACKGROUND_COLOR}
      />
    </Animated.View>
  )
}

StatusBarOnScroll.setAsCurrent = () => {
  StatusBar.setBackgroundColor(BACKGROUND_COLOR, true)
  StatusBar.setDarkContent()
  StatusBar.setHidden(false, true)
}

StatusBarOnScroll.setHidden = StatusBar.setHidden

export default StatusBarOnScroll
