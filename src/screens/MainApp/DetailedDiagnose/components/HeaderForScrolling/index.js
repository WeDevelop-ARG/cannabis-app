import React, { useRef, useEffect, useState } from 'react'
import View from 'react-native'
import * as Animated from 'react-native-animatable'
import { BackButton } from '~/components/buttons'
import { Body } from '~/components'
import VerticalSeparator from '~/components/VerticalSeparator'
import Metadata from '../Metadata'
import calendar from '~/assets/images/DetailedDiagnose/calendar.svg'
import comments from '~/assets/images/DetailedDiagnose/comments.svg'
import styles from './styles'

const TRANSITION_DURATION = 100

const HeaderForScrolling = ({ show, onGoBack, date, commentCount, solved, onSolveTapped, onReopenTapped }) => {
  const [isHidden, setIsHidden] = useState(true)
  const ref = useRef()

  useEffect(() => {
    if (show) {
      setIsHidden(false)
      ref.current.transition({ opacity: 0.0 }, { opacity: 1.0 }, TRANSITION_DURATION)
    } else {
      ref.current.transition({ opacity: 1.0 }, { opacity: 0.0 }, TRANSITION_DURATION)
      setTimeout(() => setIsHidden(true), TRANSITION_DURATION)
    }
  }, [show])

  const solvedText = (solved) ? 'Reabrir' : 'Resolver'
  const solvedCallback = (solved) ? onReopenTapped : onSolveTapped

  return (
    <Animated.View
      ref={ref}
      useNativeDriver
      style={[styles.headerContainer, (isHidden) ? styles.hidden : styles.visible]}
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
        <Body style={styles.metadataAsRow} secondary onPress={solvedCallback}>{solvedText}</Body>
      </Metadata>
    </Animated.View>
  )
}

export default HeaderForScrolling
