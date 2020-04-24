import React, { useCallback } from 'react'
import { View, FlatList } from 'react-native'
import NavigationService from '~/navigationService'
import { Subheader, Body, Date } from '~/components/texts'
import ImageButton from '~/components/buttons/ImageButton'
import styles from './styles'

const Comment = ({ text, by, date, images }) => {
  const renderImage = useCallback(({ item, index }) => {
    return (
      <ImageButton
        onPress={() => NavigationService.navigate('FullScreenImagesView', { images, startImage: index, title: by })}
        source={{ uri: item }}
        style={styles.image}
      />
    )
  }, [images, by])

  return (
    <View style={styles.commentContainer}>
      <View style={styles.metadataContainer}>
        <Subheader style={styles.by}>{by}</Subheader>
        <Date gray2>{date}</Date>
      </View>
      <Body gray>{text}</Body>
      {images && (
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderImage}
          keyExtractor={(item) => String(item)}
        />
      )}
    </View>
  )
}

export default Comment
