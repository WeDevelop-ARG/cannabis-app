import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Button } from '~/components'
import NavigationService from '~/navigationService'
import ConfirmButton from './ConfirmButton'
import CarouselImage from './CarouselImage'
import FlatListImage from './FlatListImage'
import { requestImages, newImages } from '~/constants/mocks'
import { MIN_IMAGES, MAX_IMAGES, ADD_MORE_IMAGES_URI } from './constants'
import styles, { ITEM_HEIGHT, ITEM_WIDTH, CAROUSEL_SLIDER_WIDTH } from './styles'

const ImageVisualization = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [submitError, setSubmitError] = useState(false)
  const [images, setImages] = useState(requestImages.slice())
  const carouselRef = useRef()
  const flatListRef = useRef()

  const setFlatListItem = (index) => {
    setActiveIndex(index)
    flatListRef.current.scrollToIndex({ index: index })
  }

  const setCarouselItem = (index) => {
    setActiveIndex(index)
    carouselRef.current.snapToItem(index)
  }

  const setCurrentItem = (index) => {
    setFlatListItem(index)
    setCarouselItem(index)
  }

  const confirmRequest = () => {}

  const getMorePhotos = () => {
    const filterDuplicates = newImages.filter(element => !images.includes(element))
    setImages([...images, filterDuplicates[0]])
  }

  const FlatListItem = ({ item }) => {
    const itemIndex = images.indexOf(item)
    const lastIndex = images.length - 1
    const selected = images[activeIndex] === item

    if (itemIndex === lastIndex && images.length < MAX_IMAGES) {
      return (
        <>
          <FlatListImage selected={selected} item={item} onPress={() => setCarouselItem(images.indexOf(item))} />
          <FlatListImage item={ADD_MORE_IMAGES_URI} onPress={getMorePhotos} />
        </>
      )
    }
    return (
      <FlatListImage selected={selected} item={item} onPress={() => setCarouselItem(images.indexOf(item))} />
    )
  }

  const deleteActiveIndexImage = () => {
    const wantedImages = images.slice()
    wantedImages.splice(activeIndex, 1)
    setImages(wantedImages)

    return wantedImages
  }

  const setSubmitErrorIfImageCountBelowMinimum = () => {
    if (images.length < MIN_IMAGES) {
      setSubmitError(true)
    } else {
      setSubmitError(false)
    }
  }

  useEffect(() => {
    setSubmitErrorIfImageCountBelowMinimum()

    const deleteImage = () => {
      const currentImages = deleteActiveIndexImage()

      if (currentImages.length === 0) {
        NavigationService.navigate('NoPhotoDisclaimer')
      } else {
        if (activeIndex > 0) {
          setCurrentItem(activeIndex - 1)
        }
      }
    }

    const changeImage = () => {
      const changedImageArray = images.slice()
      changedImageArray[activeIndex] = newImages[activeIndex]
      setImages(changedImageArray)
    }

    props.navigation.setParams({ deleteImage })
    props.navigation.setParams({ changeImage })
  }, [activeIndex, images.length]) // this is needed to bind to the static header on changes

  return (
    <View>
      <View>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={({ item }) => <CarouselImage item={item} />}
          sliderWidth={CAROUSEL_SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          itemHeight={ITEM_HEIGHT}
          onSnapToItem={(index) => setFlatListItem(index)}
        />
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeIndex}
          carouselRef={carouselRef}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactivePaginationDot}
        />
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={images}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <FlatListItem item={item} />}
        keyExtractor={item => item}
      />
      <ConfirmButton errorState={submitError} onConfirm={confirmRequest} />
    </View>
  )
}

ImageVisualization.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <>
      <Button variant='alpha' onPress={navigation.getParam('changeImage')}>
        <Icon name='redo' size={18} color='black' />
      </Button>
      <Button variant='alpha' onPress={navigation.getParam('deleteImage')}>
        <Icon name='trash' size={18} color='black' />
      </Button>
    </>
  )
})

export default ImageVisualization
