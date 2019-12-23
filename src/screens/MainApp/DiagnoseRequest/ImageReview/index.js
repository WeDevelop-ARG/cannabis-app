import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Button } from '~/components'
import NavigationService from '~/navigationService'
import ConfirmButton from './ConfirmButton'
import Carousel from './Carousel'
import ImageList from './ImageList'
import { requestImages, newImages } from '~/constants/mocks'
import { MIN_IMAGES } from './constants'

const ImageVisualization = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [submitError, setSubmitError] = useState(false)
  const [images, setImages] = useState(requestImages.slice())

  const confirmRequest = () => {}

  const getMorePhotos = () => {
    const filterDuplicates = newImages.filter(element => !images.includes(element))
    setImages([...images, filterDuplicates[0]])
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
          setActiveIndex(activeIndex - 1)
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
  }, [activeIndex, images.length])

  return (
    <View>
      <View>
        <Carousel
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </View>
      <ImageList
        images={images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        getMorePhotos={getMorePhotos}
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
