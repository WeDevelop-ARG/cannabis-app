import React, { useRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import FlatListItem from './FlatListItem'

const ImageList = ({ images, activeIndex, setActiveIndex, getMorePhotos }) => {
  const flatListRef = useRef()

  useEffect(() => {
    flatListRef.current.scrollToIndex({ index: activeIndex })
  }, [activeIndex])

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={images}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <FlatListItem
          image={item}
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          getMorePhotos={getMorePhotos}
        />
      )}
      keyExtractor={item => item}
    />
  )
}

export default ImageList
