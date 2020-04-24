import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import * as AnalyticsService from '~/analyticsService'
import { ForceRerenderOnNavigation } from '~/navigationService'
import FullScreenCarousel from '~/components/FullScreenCarousel'
import StatusBar from '~/components/statusBars/StatusBar'
import TranslucentStatusBar from '~/components/statusBars/TranslucentStatusBar'
import Header from './components/Header'

const FullScreenImagesView = ({ navigation }) => {
  const [images] = useState(navigation.state.params.images)
  const [startImage] = useState(navigation.state.params.startImage)
  const [title] = useState(navigation.state.params.title || '')

  useEffect(() => {
    AnalyticsService.setCurrentScreenName('Full Screen Images View')
  }, [])

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const renderStatusBar = useCallback(() => {
    TranslucentStatusBar.setAsCurrent()
    StatusBar.setTranslucent(true, true)
  }, [])

  return (
    <View>
      <TranslucentStatusBar />
      <ForceRerenderOnNavigation resetStateFunction={renderStatusBar} />
      <Header title={title} onBackButtonPress={goBack} />
      <FullScreenCarousel images={images} startAt={startImage} />
    </View>
  )
}

FullScreenImagesView.navigationOptions = ({ navigation }) => ({
  header: null
})

export default FullScreenImagesView
