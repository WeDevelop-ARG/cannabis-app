import React from 'react'
import { View } from 'react-native'
import { Button } from '~/components'
import RenderedImage from '../../../RenderedImage'
import styles from './styles'

const FlatListImage = ({ item, onPress, selected }) => (
  <Button variant='alpha' style={styles.imageContainer} onPress={onPress}>
    <View key={item} style={styles.imageContainer}>
      {
        selected
          ? <RenderedImage uri={item} style={styles.selectedFlatListImage} />
          : <RenderedImage uri={item} style={styles.flatListImage} />
      }
    </View>
  </Button>
)

export default FlatListImage
