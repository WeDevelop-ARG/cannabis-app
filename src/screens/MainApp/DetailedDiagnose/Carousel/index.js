import React, { useRef, useState, useEffect } from 'react'
import { Image, View, ActivityIndicator } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { isEmpty } from 'lodash'
import { getURL } from '~/mixins/storage'
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

const MyCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fetchingURLs, setFetchingURLs] = useState(true)
  const [imageExternalURLs, setImageExternalURLs] = useState([])
  const carouselRef = useRef()

  useEffect(() => {
    const fetchImagesURLs = async () => {
      const urls = []
      setFetchingURLs(true)

      try {
        await Promise.all(
          images.map(async (imageUID, index) => {
            const url = await getURL(imageUID)
            urls.push(url)
          })
        )
      } catch (error) {
        if (isEmpty(urls)) {
          urls.push(null)
        }
      } finally {
        setImageExternalURLs(urls)
        setFetchingURLs(false)
      }
    }

    fetchImagesURLs()
  }, [])

  if (fetchingURLs) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={imageExternalURLs}
        renderItem={({ item }) => <CarouselImage uri={item} />}
        sliderWidth={CAROUSEL_SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={imageExternalURLs.length}
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

export default MyCarousel
