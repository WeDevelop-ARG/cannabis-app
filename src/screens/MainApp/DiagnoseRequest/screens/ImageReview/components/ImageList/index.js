import React, { useRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import FlatListItem from './FlatListItem'
import styles from './styles'
import { ITEM_LENGTH } from './FlatListImage/styles'

const ImageList = ({ images, activeIndex, onActiveIndexChange }) => {
  const flatListRef = useRef()

  useEffect(() => {
    flatListRef.current.scrollToIndex({ index: activeIndex })
  }, [activeIndex])

  return (
    <FlatList
      style={styles.itemContainer}
      ref={flatListRef}
      horizontal
      data={images}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <FlatListItem
          image={item}
          images={images}
          activeIndex={activeIndex}
          onActiveIndexChange={onActiveIndexChange}
        />
      )}
      keyExtractor={item => item}
      getItemLayout={(images, index) => (
        { length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index }
      )}
    />
  )
}

export default ImageList
