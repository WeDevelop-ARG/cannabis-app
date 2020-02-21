import React, { useEffect, useState } from 'react'
import Animated, { Easing } from 'react-native-reanimated'
import { verticalScale } from 'react-native-size-matters/extend'
import NavigationService from '~/navigationService'
import Diagnose from '../Diagnose'
import Button from '~/components/buttons/Button'
import { isRequestSolved } from '~/mixins/diagnose/isRequestSolved'

const DIAGNOSE_HEIGHT = verticalScale(140)

const {
  timing
} = Animated

const goToDetailedDiagnoseScreen = (diagnose) => {
  NavigationService.navigate('DetailedDiagnose', { diagnose })
}

const RenderDiagnose = ({ item, animationDuration }) => {
  const [flex] = useState(new Animated.Value(DIAGNOSE_HEIGHT))
  const {
    builtDiagnose: diagnose,
    id: key,
    isClosed
  } = item
  const answerQuantity = diagnose.amountOfAnswers || 0

  useEffect(() => {
    const config = {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease)
    }

    if (isClosed) {
      const anim = timing(flex, { ...config, toValue: 0 })

      anim.start()
    } else {
      const anim = timing(flex, { ...config, toValue: DIAGNOSE_HEIGHT })

      anim.start()
    }
  }, [isClosed])

  return (
    <Animated.View
      style={{ height: flex, overflow: 'hidden' }}
    >
      <Button
        onPress={() => goToDetailedDiagnoseScreen(diagnose)}
        activeOpacity={0.9}
      >
        <Diagnose
          key={key}
          thumbnail={diagnose.thumbnail}
          firebaseTimestamp={diagnose.createdAt}
          description={diagnose.text}
          answerQuantity={answerQuantity}
          solved={isRequestSolved(diagnose)}
        />
      </Button>
    </Animated.View>
  )
}

export default RenderDiagnose
