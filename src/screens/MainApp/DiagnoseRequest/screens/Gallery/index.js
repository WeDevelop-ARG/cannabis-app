import React, { useState, useEffect, useCallback, useMemo } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { FlatList, Alert, PermissionsAndroid } from 'react-native'
import Background from '~/components/Background'
import * as ImageService from '~/imageService'
import { requestReadPermissions, requestWritePermissions } from '~/permissionsService'
import ListItem from './components/ListItem'
import ContinueButton from './components/ContinueButton'
import TakePhotoButton from './components/TakePhotoButton'
import styles, { SCREEN_WIDTH } from './styles'

const PAGE_SIZE = 10
const MAX_SELECTION_COUNT = 10
const MIN_SELECTION_COUNT = 3
const DEFAULT_COLUMNS_COUNT = 3

const getPhotos = (endCursor) => {
  const config = {
    first: PAGE_SIZE,
    assetType: 'Photos'
  }

  if (endCursor) config.after = endCursor

  return CameraRoll.getPhotos(config)
}

const alertPermissionsError = () => {
  Alert.alert('Error', 'No se pudo acceder al almacenamiento del dispositivo. Verifique los permisos de la aplicación.')
}

const Gallery = ({ navigation }) => {
  const [images, setImages] = useState(['Placeholder Key For TakePhotoButton'])
  const [selectedImages, setSelectedImages] = useState([])
  const [hasMoreImages, setHasMoreImages] = useState(true)
  const [endCursor, setEndCursor] = useState(null)
  const params = navigation.state.params
  const numColumns = (params) ? params.numColumns || DEFAULT_COLUMNS_COUNT : DEFAULT_COLUMNS_COUNT

  const updateImagesAndCursor = (result) => {
    const newImages = result.edges.map(obj => obj.node.image.uri).filter((image) => !images.includes(image))
    setImages([...images, ...newImages])
    setHasMoreImages(result.page_info.has_next_page)
    setEndCursor(result.page_info.end_cursor)
  }

  const goToImageReview = useCallback(
    () => {
      const length = selectedImages.length
      if (length >= MIN_SELECTION_COUNT && length <= MAX_SELECTION_COUNT) {
        navigation.navigate('ImageReview', { images: selectedImages })
      }
    },
    [selectedImages, navigation]
  )

  const loadMore = useCallback(
    async () => {
      const granted = await requestReadPermissions()
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alertPermissionsError()
        return
      }

      if (hasMoreImages) {
        try {
          updateImagesAndCursor(await getPhotos(endCursor))
        } catch (error) {
          alertPermissionsError()
        }
      }
    },
    [endCursor, hasMoreImages]
  )

  const canSelectMoreImages = useCallback(
    () => selectedImages.length < MAX_SELECTION_COUNT,
    [selectedImages]
  )

  const toggleSelect = useCallback(
    (item) => {
      const newSelectedImages = [...selectedImages]
      const index = newSelectedImages.indexOf(item)

      if (index !== -1) {
        newSelectedImages.splice(index, 1)
      } else {
        if (canSelectMoreImages()) {
          newSelectedImages.push(item)
        }
      }

      setSelectedImages(newSelectedImages)
    },
    [selectedImages]
  )

  const callCamera = useCallback(
    async () => {
      const granted = await requestWritePermissions()

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        alertPermissionsError()

        return
      }

      try {
        const [image] = await ImageService.openCamera()
        const newImages = [...images]

        newImages.splice(1, 0, image)
        await CameraRoll.saveToCameraRoll(image)
        setImages(newImages)
      } catch (error) {
      }
    },
    [images]
  )

  useEffect(() => {
    const params = navigation.state.params

    if (!params) return

    if (params.addedImages) {
      const newImages = [...images]
      newImages.splice(1, 0, ...params.addedImages)
      setImages(newImages)
    }

    if (params.selectedImages) {
      setSelectedImages([...params.selectedImages])
    }
  }, [navigation.state])

  const size = useMemo(
    () => SCREEN_WIDTH / numColumns,
    [numColumns]
  )

  return (
    <Background>
      <FlatList
        data={images}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMore}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <TakePhotoButton onPress={callCamera} size={size} />
            )
          }

          return (
            <ListItem
              item={item}
              width={size}
              height={size}
              selectedIndex={selectedImages.indexOf(item) + 1}
              onPress={() => toggleSelect(item)}
            />
          )
        }}
      />
      {(selectedImages.length >= MIN_SELECTION_COUNT) && (
        <ContinueButton onPress={goToImageReview} />
      )}
    </Background>
  )
}

Gallery.navigationOptions = () => ({ title: 'Galería' })

export default Gallery
