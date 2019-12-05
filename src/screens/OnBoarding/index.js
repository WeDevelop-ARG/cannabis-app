import React, { useState, useRef } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import NavigationService from '~/navigationService'
import Background from '~/helpers/Background'
import AppText from '~/helpers/AppText'
import OnBoardingItem from './OnBoardingItem'
import Header from './Header'
import firstImage from '~/assets/images/OnBoarding/first.png'
import secondImage from '~/assets/images/OnBoarding/second.png'
import thirdImage from '~/assets/images/OnBoarding/third.png'
import styles from './styles'

const OnBoardingItems = [
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
  <OnBoardingItem imageSource={item.imageSource}>
    {item.text}
  </OnBoardingItem>
)

const handleExit = async () => {
  await CacheService.setItem('OnBoardingSeen', 'true')
  NavigationService.navigate('SignUp')
}

const OnBoarding = () => {
  AnalyticsService.setCurrentScreenName('OnBoarding')
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef()

  const slideIsLastOne = (index) => {
    return ((index) === OnBoardingItems.length - 1)
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
            data={OnBoardingItems}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
            onSnapToItem={(index) => moveCarouselWithSlide(index)}
          />
          <Pagination
            dotsLength={OnBoardingItems.length}
            activeDotIndex={activeIndex}
            carouselRef={carouselRef}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.inactivePaginationDot}
          />
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={moveCarouselForwardWithButton}
        >
          <AppText style={styles.continueButtonText}>Siguiente</AppText>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default OnBoarding
