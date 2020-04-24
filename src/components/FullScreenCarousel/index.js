import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styles, { CAROUSEL_SLIDER_WIDTH, ITEM_WIDTH, ITEM_HEIGHT } from './styles'

const CarouselImage = ({ uri }) => {
  return (
    <View style={styles.carouselImageContainer}>
      <FastImage
        style={styles.carouselImage}
        source={{ uri }}
      />
    </View>
  )
}

const FullScreenCarousel = ({ images, startAt }) => {
  const carouselRef = useRef()
  const [activeIndex, setActiveIndex] = useState(startAt || 0)

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={images}
        firstItem={startAt}
        renderItem={({ item }) => <CarouselImage key={item} uri={item} />}
        sliderWidth={CAROUSEL_SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        onSnapToItem={(index) => setActiveIndex(index)}
        useScrollView
        decelerationRate={0.10}
        swipeThreshold={0.5}
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

export default FullScreenCarousel
