import React, { useCallback, useState, useEffect } from 'react'
import Background from '~/components/Background'
import GenericGallery from '~/components/Gallery'

const SolutionGallery = ({ navigation }) => {
  const [params, setParams] = useState(navigation.state.params)

  useEffect(() => {
    if (navigation.state) {
      const params = navigation.state.params

      setParams(params)
    }
  }, [navigation.state])

  const goToSolutionRequest = useCallback((images) => {
    navigation.navigate('SolutionRequest', { images })
  }, [navigation])

  return (
    <Background>
      <GenericGallery
        params={params}
        onSubmit={goToSolutionRequest}
        minSelectionCount={1}
      />
    </Background>
  )
}

SolutionGallery.navigationOptions = () => ({ title: 'Galería' })

export default SolutionGallery
