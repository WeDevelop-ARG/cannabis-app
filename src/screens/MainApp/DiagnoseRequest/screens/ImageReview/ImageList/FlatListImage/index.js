import React from 'react'
import { View } from 'react-native'
import { Button } from '~/components'
import RenderedImage from '../../RenderedImage'
import styles from './styles'

const FlatListImage = ({ image, onPress, selected }) => (
  <Button variant='alpha' style={styles.imageContainer} onPress={onPress}>
    <View key={image} style={styles.imageContainer}>
      {
        selected
          ? <RenderedImage uri={image} style={styles.selectedFlatListImage} />
          : <RenderedImage uri={image} style={styles.flatListImage} />
      }
    </View>
  </Button>
)

export default FlatListImage
