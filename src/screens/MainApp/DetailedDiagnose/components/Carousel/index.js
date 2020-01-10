import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Carousel from '~/components/Carousel'
import { isEmpty } from 'lodash'
import { getURL } from '~/mixins/storage'
import styles from './styles'

const MyCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fetchingURLs, setFetchingURLs] = useState(true)
  const [imageExternalURLs, setImageExternalURLs] = useState([])

  useEffect(() => {
    const fetchImagesURLs = async () => {
      const urls = []
      setFetchingURLs(true)

      try {
        await Promise.all(
          images.map(async (imageUID, index) => {
            const url = await getURL(imageUID)
            urls.push(url)
          })
        )
      } catch (error) {
        if (isEmpty(urls)) {
          urls.push(null)
        }
      } finally {
        setImageExternalURLs(urls)
        setFetchingURLs(false)
      }
    }

    fetchImagesURLs()
  }, [])

  if (fetchingURLs) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <Carousel
      images={imageExternalURLs}
      activeIndex={activeIndex}
      onActiveIndexChange={setActiveIndex}
    />
  )
}

export default MyCarousel
