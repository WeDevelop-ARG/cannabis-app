import React from 'react'
import { View, FlatList } from 'react-native'
import ImageWithCloseBadge from '~/components/ImageWithCloseBadge'
import styles from './styles'

const NewCommentImageList = ({ images, onImagePress, style }) => {
  if (!images) return (null)

  return (
    <View style={[styles.imageContainer, style]}>
      <FlatList
        horizontal
        data={images}
        renderItem={({ item }) => (
          <ImageWithCloseBadge
            key={item}
            uri={item}
            onPress={() => onImagePress(item)}
          />
        )}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={styles.flatListContainerStyle}
      />
    </View>
  )
}

export default NewCommentImageList
