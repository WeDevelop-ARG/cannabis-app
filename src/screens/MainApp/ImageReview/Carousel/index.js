import React, { useRef, useEffect } from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselImage from './CarouselImage'
import styles, { ITEM_HEIGHT, ITEM_WIDTH, CAROUSEL_SLIDER_WIDTH } from './styles'

const CarouselWrapper = ({ images, activeIndex, onActiveIndexChange }) => {
  const carouselRef = useRef()

  useEffect(() => {
    carouselRef.current.snapToItem(activeIndex)
  }, [activeIndex, images.length])

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={({ item }) => <CarouselImage item={item} />}
        sliderWidth={CAROUSEL_SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        onSnapToItem={(index) => onActiveIndexChange(index)}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        carouselRef={carouselRef}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.inactivePaginationDot}
      />
    </View>
  )
}

export default CarouselWrapper
