import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import * as AnalyticsService from '~/analyticsService'
import NavigationService from '~/navigationService'
import * as ImageService from '~/imageService'
import { ImageSelection } from '~/components'
import Background from '~/components/Background'
import ConfirmButton from './components/ConfirmButton'
import AddMoreImagesButton from './components/AddMoreImagesButton'
import Carousel from '~/components/Carousel'
import ImageList from './components/ImageList'
import ReviewHeader from './components/ReviewHeader'
import { MIN_IMAGES, MAX_IMAGES, TIMEOUT_TO_WAIT_FOR_RENDERING } from './constants'

const ImageVisualization = ({ navigation }) => {
  const imagesFromPreviousStep = navigation.state.params.images

  const [activeIndex, setActiveIndex] = useState(0)
  const [submitError, setSubmitError] = useState(false)
  const [images, setImages] = useState(imagesFromPreviousStep)
  const [showImageSelection, setShowImageSelection] = useState(false)
  const [carouselComponent, setCarouselComponent] = useState(null)
  const [imageListComponent, setImageListComponent] = useState(null)

  AnalyticsService.setCurrentScreenName('Image Review')

  useEffect(() => {
    setImages(imagesFromPreviousStep)
  }, [imagesFromPreviousStep])

  const confirmRequest = () => {
    navigation.navigate('DescriptionRequest', { images })
  }

  const canAddMoreImages = () => (
    images.length < MAX_IMAGES
  )

  const waitForImagesRenderingAndSetIndex = (index) => {
    setTimeout(() => setActiveIndex(index), TIMEOUT_TO_WAIT_FOR_RENDERING)
  }

  const getMorePhotos = () => {
    setShowImageSelection(true)
  }

  const onImagesSelected = (newImages) => {
    const filterDuplicates = newImages.filter(element => !images.includes(element))
    if (filterDuplicates.length > 0) {
      const allImages = [...images, ...filterDuplicates]

      setImages(allImages.slice(0, MAX_IMAGES))
      waitForImagesRenderingAndSetIndex(images.length)
    }
    setShowImageSelection(false)
  }

  const deleteActiveIndexImage = () => {
    const wantedImages = images.slice()

    wantedImages.splice(activeIndex, 1)
    setImages(wantedImages)

    return wantedImages
  }

  const setSubmitErrorIfImageCountBelowMinimum = () => {
    return setSubmitError(images.length < MIN_IMAGES)
  }

  const deleteImage = () => {
    const currentImages = deleteActiveIndexImage()

    if (currentImages.length === 0) {
      NavigationService.navigate('NoPhotoDisclaimer')
    } else if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const changeImage = async () => {
    try {
      const [newImage] = await ImageService.openCamera()
      const newImages = images.slice()

      newImages[activeIndex] = newImage
      setImages(newImages)
    } catch (error) {
      console.log(error)
    }
  }

  const goBack = () => {
    navigation.pop()
  }

  useEffect(() => {
    setSubmitErrorIfImageCountBelowMinimum()

    const buildCarousel = () => {
      return (
        <Carousel
          images={images}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />
      )
    }

    const buildImageList = () => {
      return (
        <ImageList
          images={images}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onGetMoreImages={getMorePhotos}
        />
      )
    }

    setCarouselComponent(buildCarousel())
    setImageListComponent(buildImageList())
  }, [activeIndex, images])

  return (
    <Background>
      <ReviewHeader
        goBack={goBack}
        changeImage={changeImage}
        deleteImage={deleteImage}
      />
      {showImageSelection &&
        <ImageSelection
          onCancel={() => setShowImageSelection(false)}
          onImagesSelected={onImagesSelected}
        />}
      {carouselComponent}
      {imageListComponent}
      <View>
        <ConfirmButton errorState={submitError} onConfirm={confirmRequest} />
        {canAddMoreImages() && <AddMoreImagesButton onPress={getMorePhotos} />}
      </View>
    </Background>
  )
}

ImageVisualization.navigationOptions = () => ({
  header: null
})

export default ImageVisualization
