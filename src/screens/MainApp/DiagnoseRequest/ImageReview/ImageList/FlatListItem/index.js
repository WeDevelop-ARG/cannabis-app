import React from 'react'
import FlatListImage from './FlatListImage'
import { MAX_IMAGES, ADD_MORE_IMAGES_URI } from '../../constants'

const FlatListItem = ({ image, images, activeIndex, setActiveIndex, getMorePhotos }) => {
  const itemIndex = images.indexOf(image)
  const lastIndex = images.length - 1
  const selected = images[activeIndex] === image

  if (itemIndex === lastIndex && images.length < MAX_IMAGES) {
    return (
      <>
        <FlatListImage selected={selected} item={image} onPress={() => setActiveIndex(images.indexOf(image))} />
        <FlatListImage item={ADD_MORE_IMAGES_URI} onPress={getMorePhotos} />
      </>
    )
  }

  return (
    <FlatListImage selected={selected} item={image} onPress={() => setActiveIndex(images.indexOf(image))} />
  )
}

export default FlatListItem
