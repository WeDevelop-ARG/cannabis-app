import React from 'react'
import FlatListImage from '../FlatListImage'
import { MAX_IMAGES, ADD_MORE_IMAGES_URI } from '../../constants'

const FlatListItem = ({ image, images, activeIndex, onActiveIndexChange, onAskForMoreItems }) => {
  const imageIndex = images.indexOf(image)
  const lastImageIndex = images.length - 1
  const isSelected = images[activeIndex] === image

  if (imageIndex === lastImageIndex && images.length < MAX_IMAGES) {
    return (
      <>
        <FlatListImage selected={isSelected} image={image} onPress={() => onActiveIndexChange(imageIndex)} />
        <FlatListImage image={ADD_MORE_IMAGES_URI} onPress={onAskForMoreItems} />
      </>
    )
  }

  return (
    <FlatListImage selected={isSelected} image={image} onPress={() => onActiveIndexChange(imageIndex)} />
  )
}

export default FlatListItem
