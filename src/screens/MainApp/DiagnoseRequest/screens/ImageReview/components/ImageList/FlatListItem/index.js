import React from 'react'
import FlatListImage from '../FlatListImage'

const FlatListItem = ({ image, images, activeIndex, onActiveIndexChange }) => {
  const imageIndex = images.indexOf(image)
  const isSelected = images[activeIndex] === image

  return (
    <FlatListImage selected={isSelected} image={image} onPress={() => onActiveIndexChange(imageIndex)} />
  )
}

export default FlatListItem
