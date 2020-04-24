import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import CameraRoll from '@react-native-community/cameraroll'
import { FlatList, Alert, PermissionsAndroid } from 'react-native'
import PropTypes from 'prop-types'
import * as ImageService from '~/imageService'
import { requestReadPermissions, requestWritePermissions } from '~/permissionsService'
import ListItem from './components/ListItem'
import ContinueButton from './components/ContinueButton'
import TakePhotoButton from './components/TakePhotoButton'
import styles, { SCREEN_WIDTH } from './styles'

const PAGE_SIZE = 5
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

const alertCallCameraError = () => {
  Alert.alert('Error', 'Ocurrió un error inesperado al guardar el archivo.')
}

const Gallery = ({ params, minSelectionCount, maxSelectionCount, onSubmit, containerStyle }) => {
  const [images, setImages] = useState(['Placeholder Key For TakePhotoButton'])
  const [selectedImages, setSelectedImages] = useState([])
  const [hasMoreImages, setHasMoreImages] = useState(true)
  const [endCursor, setEndCursor] = useState(null)
  const numColumns = (params) ? params.numColumns || DEFAULT_COLUMNS_COUNT : DEFAULT_COLUMNS_COUNT

  const updateImagesAndCursor = (result) => {
    const newImages = result.edges.map(obj => obj.node.image.uri).filter((image) => !images.includes(image))
    setImages([...images, ...newImages])
    setHasMoreImages(result.page_info.has_next_page)
    setEndCursor(result.page_info.end_cursor)
  }

  const onSubmitPress = useCallback(
    () => {
      const length = selectedImages.length
      if (length >= minSelectionCount && length <= maxSelectionCount) {
        onSubmit(selectedImages)
      }
    },
    [selectedImages, minSelectionCount, maxSelectionCount, onSubmit]
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
    () => selectedImages.length < maxSelectionCount,
    [selectedImages, maxSelectionCount]
  )

  const toggleSelect = useCallback(
    (item) => {
      setSelectedImages(selectedImages => {
        const newSelectedImages = [...selectedImages]
        const index = newSelectedImages.indexOf(item)

        if (index !== -1) {
          newSelectedImages.splice(index, 1)
        } else {
          if (canSelectMoreImages()) {
            newSelectedImages.push(item)
          }
        }

        return newSelectedImages
      })
    },
    [canSelectMoreImages]
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
        await CameraRoll.saveToCameraRoll(image)

        setImages(images => {
          const newImages = [...images]

          newImages.splice(1, 0, image)

          return newImages
        })
      } catch (error) {
        alertCallCameraError()
      }
    },
    []
  )

  useEffect(() => {
    if (!params) return

    if (params.addedImages) {
      setImages(images => {
        const newImages = [...images]

        newImages.splice(1, 0, ...params.addedImages)

        return newImages
      })
    }

    if (params.selectedImages) {
      setSelectedImages([...params.selectedImages])
    }
  }, [params])

  const size = useMemo(
    () => SCREEN_WIDTH / numColumns,
    [numColumns]
  )

  const renderItem = useCallback(({ item, index }) => {
    if (index === 0) {
      return (
        <TakePhotoButton onPress={callCamera} size={size} />
      )
    }

    const toggleItem = () => toggleSelect(item)

    return (
      <ListItem
        item={item}
        width={size}
        height={size}
        selectedIndex={selectedImages.indexOf(item) + 1}
        onPress={toggleItem}
      />
    )
  }, [size, toggleSelect, selectedImages])

  return (
    <>
      <FlatList
        data={images}
        keyExtractor={item => item}
        contentContainerStyle={[styles.listContainer, containerStyle]}
        onEndReached={loadMore}
        renderItem={renderItem}
      />
      {(selectedImages.length >= minSelectionCount) && (
        <ContinueButton onPress={onSubmitPress} />
      )}
    </>
  )
}

Gallery.navigationOptions = () => ({ title: 'Galería' })

Gallery.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

Gallery.defaultProps = {
  minSelectionCount: MIN_SELECTION_COUNT,
  maxSelectionCount: MAX_SELECTION_COUNT,
  containerStyle: styles.defaultMargin
}

export default memo(Gallery)
