import React, { memo, useState, useEffect, useCallback } from 'react'
import FastImage from 'react-native-fast-image'
import { View, StyleSheet } from 'react-native'
import { Button, Body } from '~/components'
import styles from './styles'

const MemoizedImage = memo(({ item }) => {
  return (
    <FastImage
      style={styles.image}
      source={{ uri: item }}
    />
  )
})

const ListItem = ({ item, width, height, selectedIndex, onPress }) => {
  const [baseStyle] = useState(StyleSheet.create({ width, height }))
  const [mutableStyle, setMutableStyle] = useState({})

  const handlePress = useCallback(() => {
    onPress(item)
  }, [item, onPress])

  useEffect(() => {
    if (!selectedIndex) {
      setMutableStyle(styles.noPadding)
    } else {
      setMutableStyle({})
    }
  }, [selectedIndex])

  return (
    <Button
      style={[styles.imageButton, baseStyle, mutableStyle]}
      onPress={handlePress}
    >
      <MemoizedImage item={item} />
      {(selectedIndex > 0) && (
        <View style={styles.badge}>
          <Body white style={styles.badgeText}>{selectedIndex}</Body>
        </View>
      )}
    </Button>
  )
}

export default memo(ListItem)
