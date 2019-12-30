import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Button, ImageSelection } from '~/components'
import NavigationService from '~/navigationService'
import * as ImageService from '~/imageService'
import ConfirmButton from './ConfirmButton'
import Carousel from './Carousel'
import ImageList from './ImageList'
import { MIN_IMAGES, MAX_IMAGES } from './constants'

const ImageVisualization = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [submitError, setSubmitError] = useState(false)
  const [images, setImages] = useState(props.navigation.state.params.images)
  const [showImageSelection, setShowImageSelection] = useState(false)

  useEffect(() => {
    setImages(props.navigation.state.params.images)
  }, [props.navigation.state.params.images])

  const confirmRequest = () => {
    NavigationService.navigate('DescriptionRequest', { images: images })
  }

  const getMorePhotos = () => {
    setShowImageSelection(true)
  }

  const onImagesSelected = (newImages) => {
    const filterDuplicates = newImages.filter(element => !images.includes(element))
    if (filterDuplicates.length > 0) {
      const allImages = [...images, ...filterDuplicates]

      setImages(allImages.slice(0, MAX_IMAGES))
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
      } else if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }

    const changeImage = async () => {
      try {
        const newImage = (await ImageService.openCamera())[0]
        const newImages = images.slice()

        newImages[activeIndex] = newImage
        setImages(newImages)
      } catch (error) {
        console.log(error)
      }
    }

    props.navigation.setParams({ deleteImage })
    props.navigation.setParams({ changeImage })
  }, [activeIndex, images.length])

  return (
    <View>
      {showImageSelection &&
        <ImageSelection
          onCancel={() => setShowImageSelection(false)}
          onImagesSelected={onImagesSelected}
        />}
      <View>
        <Carousel
          images={images}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        />
      </View>
      <ImageList
        images={images}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onGetMoreImages={getMorePhotos}
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
