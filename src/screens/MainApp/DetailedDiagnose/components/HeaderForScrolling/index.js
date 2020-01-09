import React, { useRef, useEffect } from 'react'
import * as Animated from 'react-native-animatable'
import { BackButton } from '~/components/buttons'
import VerticalSeparator from '~/components/VerticalSeparator'
import Metadata from '../Metadata'
import calendar from '~/assets/images/DetailedDiagnose/calendar.svg'
import comments from '~/assets/images/DetailedDiagnose/comments.svg'
import styles from './styles'

const TRANSITION_DURATION = 250

const HeaderForScrolling = ({ show, onGoBack, date, commentCount }) => {
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
      style={styles.headerContainer}
    >
      <BackButton
        style={styles.backButton}
        onPress={onGoBack}
      />
      <Metadata metadataContainerStyle={styles.metadataContainer}>
        <Metadata.Item
          style={styles.metadataAsRow}
          data={date}
          svg={calendar}
        />
        <VerticalSeparator style={styles.verticalLine} />
        <Metadata.Item
          style={styles.metadataAsRow}
          data={commentCount}
          svg={comments}
        />
      </Metadata>
    </Animated.View>
  )
}

export default HeaderForScrolling
