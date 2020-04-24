import React, { useCallback, useState, useEffect } from 'react'
import Background from '~/components/Background'
import GenericGallery from '~/components/Gallery'

const Gallery = ({ navigation }) => {
  const [params, setParams] = useState(navigation.state.params)

  useEffect(() => {
    if (navigation.state) {
      const params = navigation.state.params

      setParams(params)
    }
  }, [navigation.state])

  const goToImageReview = useCallback((images) => {
    navigation.navigate('ImageReview', { images })
  }, [navigation])

  return (
    <Background>
      <GenericGallery
        params={params}
        onSubmit={goToImageReview}
      />
    </Background>
  )
}

Gallery.navigationOptions = () => ({ title: 'Galería' })

export default Gallery
