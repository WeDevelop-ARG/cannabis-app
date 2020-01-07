import React, { useRef, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import PropTypes from 'prop-types'
import DrCannabisLogo from '~/assets/images/DrCannabis.png'
import styles, { CAROUSEL_SLIDER_WIDTH, ITEM_WIDTH, ITEM_HEIGHT } from './styles'

const CarouselImage = ({ uri }) => {
  return (
    <View style={styles.carouselImageContainer}>
      <Image
        resizeMethod='scale'
        style={uri ? styles.carouselImage : styles.placeholder}
        source={uri ? { uri } : DrCannabisLogo}
      />
    </View>
  )
}

const MyCarousel = ({ images, activeIndex, onActiveIndexChange, style }) => {
  const carouselRef = useRef()
  const [privateImages, setPrivateImages] = useState(images)
  const [privateIndex, setPrivateIndex] = useState(activeIndex)

  useEffect(() => {
    carouselRef.current.snapToItem(activeIndex)
    setPrivateIndex(activeIndex)
  }, [activeIndex])

  useEffect(() => {
    setPrivateImages(images)
  }, [images])

  return (
    <View style={style}>
      <Carousel
        ref={carouselRef}
        data={privateImages}
        renderItem={({ item }) => <CarouselImage uri={item} />}
        sliderWidth={CAROUSEL_SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        onSnapToItem={(index) => onActiveIndexChange(index)}
        useScrollView
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={privateImages.length}
          activeDotIndex={privateIndex}
          carouselRef={carouselRef}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactivePaginationDot}
          inactiveDotOpacity={1.0}
        />
      </View>
    </View>
  )
}

MyCarousel.propTypes = {
  images: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onActiveIndexChange: PropTypes.func.isRequired
}

export default MyCarousel
