import React from 'react'
import { View, FlatList } from 'react-native'
import ImageButton from '~/components/buttons/ImageButton'
import XClose from '~/components/badges/XClose'
import styles from './styles'

const Image = ({ uri, onPress }) => {
  return (
    <View>
      <XClose style={styles.closeBadge} />
      <ImageButton
        source={{ uri }}
        onPress={onPress}
        style={styles.image}
      />
    </View>
  )
}

const NewCommentImageList = ({ images, onImagePress, style }) => {
  if (!images) return (null)

  return (
    <View style={[styles.imageContainer, style]}>
      <FlatList
        horizontal
        data={images}
        renderItem={({ item }) => (
          <Image
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
