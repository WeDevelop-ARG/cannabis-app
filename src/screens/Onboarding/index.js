import React, { useState, useRef } from 'react'
import { View, ScrollView } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import * as AnalyticsService from '~/analyticsService'
import * as CacheService from '~/cacheService'
import NavigationService from '~/navigationService'
import Background from '~/helpers/Background'
import OnboardingItem from './OnboardingItem'
import Header from './Header'
import firstImage from '~/assets/images/Onboarding/first.svg'
import secondImage from '~/assets/images/Onboarding/second.svg'
import thirdImage from '~/assets/images/Onboarding/third.svg'
import styles from './styles'
import { scale } from 'react-native-size-matters/extend'
import { PrimaryButton, Description } from '~/components'

const renderItem = ({ item, index }) => (
  <OnboardingItem
    image={item.image}
    title={item.title}
    description={item.description}
  />
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
    if (slideIsLastOne(activeIndex)) {
      await handleExit()
    } else {
      setActiveIndex(activeIndex + 1)
      carouselRef.current.snapToNext()
    }
  }

  const moveCarouselWithSlide = async (index) => {
    setActiveIndex(index)
  }

  const OnboardingItems = [
    {
      image: {
        source: firstImage,
        width: 162,
        height: 106
      },
      title: 'Conocé',
      description: 'Conocé el estado de tus plantas y los cuidados que necesitan'
    },
    {
      image: {
        source: secondImage,
        width: 86,
        height: 106
      },
      title: 'Diagnosticá',
      description: 'Subí fotos, solicitá revisiones y diagnosticá posibles problemas'
    },
    {
      image: {
        source: thirdImage,
        width: 115,
        height: 106
      },
      title: 'Recibí ayuda',
      description: 'Recibí ayuda de nuestra comunidad de expertos'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={OnboardingItems}
          renderItem={renderItem}
          sliderWidth={scale(375)}
          itemWidth={scale(375)}
          onSnapToItem={(index) => moveCarouselWithSlide(index)}
        />
        <PrimaryButton
          onPress={moveCarouselForwardWithButton}
          style={styles.button}
        >
          <Description white>{(slideIsLastOne(activeIndex) && 'Comenzar') || 'Siguiente'}</Description>
        </PrimaryButton>
        <Pagination
          dotsLength={OnboardingItems.length}
          activeDotIndex={activeIndex}
          carouselRef={carouselRef}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactivePaginationDot}
          style={styles.pagination}
        />
      </View>
      <Header onExitPress={handleExit} />
    </View>
  )
}

export default Onboarding
