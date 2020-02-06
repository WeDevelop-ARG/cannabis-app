import React, { useRef, useEffect, useState, memo } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import PropTypes from 'prop-types'
import { SvgXml } from 'react-native-svg'
import logo from '~/assets/images/logo.svg'
import styles, { CAROUSEL_SLIDER_WIDTH, ITEM_WIDTH, ITEM_HEIGHT } from './styles'

const CarouselImage = ({ uri }) => {
  return (
    uri ? (
      <View style={styles.carouselImageContainer}>
        <FastImage
          style={styles.carouselImage}
          source={{ uri }}
        />
      </View>
    ) : (
      <View style={styles.carouselImageContainer}>
        <View style={styles.placeholder}>
          <SvgXml
            width='100%'
            height='100%'
            xml={logo}
          />
        </View>
      </View>
    )
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
        renderItem={({ item }) => <CarouselImage key={item} uri={item} />}
        sliderWidth={CAROUSEL_SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        onSnapToItem={(index) => onActiveIndexChange(index)}
        useScrollView
        decelerationRate={0.10}
        swipeThreshold={0.5}
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

export default memo(MyCarousel)
