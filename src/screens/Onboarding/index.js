import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import NavigationService from '~/navigationService'
import Background from '~/helpers/Background'
import { Text, Button } from '~/components'
import OnboardingItem from './OnboardingItem'
import Header from './Header'
import firstImage from '~/assets/images/Onboarding/first.png'
import secondImage from '~/assets/images/Onboarding/second.png'
import thirdImage from '~/assets/images/Onboarding/third.png'
import styles from './styles'

const OnboardingItems = [
  {
    imageSource: firstImage,
    text: '¿Querés saber el estado de tu planta?'
  },
  {
    imageSource: secondImage,
    text: 'Mandanos fotos para que la podamos diagnosticar.'
  },
  {
    imageSource: thirdImage,
    text: '¡Esperá el feedback de nuestros expertos cannabineros!'
  },
  {
    text: ''
  }
]

const renderItem = ({ item, index }) => (
  <OnboardingItem imageSource={item.imageSource}>
    {item.text}
  </OnboardingItem>
)

const handleExit = async () => {
  await CacheService.setItem('OnboardingSeen', 'true')
  NavigationService.navigate('SignUp')
}

const Onboarding = () => {
  AnalyticsService.setCurrentScreenName('Onboarding')
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef()

  const slideIsLastOne = (index) => {
    return ((index) === OnboardingItems.length - 1)
  }

  const nextSlideIsLastOne = () => {
    return slideIsLastOne(activeIndex + 1)
  }

  const moveCarouselForwardWithButton = async () => {
    if (nextSlideIsLastOne()) {
      await handleExit()
    } else {
      setActiveIndex(activeIndex + 1)
      carouselRef.current.snapToNext()
    }
  }

  const moveCarouselWithSlide = async (index) => {
    setActiveIndex(index)
    if (slideIsLastOne(index)) {
      await handleExit()
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Header onExitPress={handleExit} />
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={OnboardingItems}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
            onSnapToItem={(index) => moveCarouselWithSlide(index)}
          />
          <Pagination
            dotsLength={OnboardingItems.length}
            activeDotIndex={activeIndex}
            carouselRef={carouselRef}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.inactivePaginationDot}
          />
        </View>
        <Button
          variant='alpha'
          onPress={moveCarouselForwardWithButton}
        >
          <Text>Siguiente</Text>
        </Button>
      </View>
    </Background>
  )
}

export default Onboarding
