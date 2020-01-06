import React, { useRef, useEffect } from 'react'
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

  useEffect(() => {
    carouselRef.current.snapToItem(activeIndex)
  }, [activeIndex, images.length])

  return (
    <View style={style}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={({ item }) => <CarouselImage uri={item} />}
        sliderWidth={CAROUSEL_SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        onSnapToItem={(index) => onActiveIndexChange(index)}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeIndex}
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
