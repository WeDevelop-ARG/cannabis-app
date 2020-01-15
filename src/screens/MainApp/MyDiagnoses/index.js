import React, { useState, useEffect, useRef } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { isNull, isEmpty } from 'lodash'
import * as AnalyticsService from '~/analyticsService'
import { ForceRerenderOnNavigation } from '~/navigationService'
import * as DatabaseService from '~/databaseService'
import { sortDiagnosesByMostRecentCreation } from '~/mixins/diagnose'
import { getURL } from '~/mixins/storage'
import { renderDiagnoses } from './renderUtilities'
import Background from '~/components/Background'
import NoDiagnoses from './components/NoDiagnoses'
import Header from './components/Header'
import DetailedDiagnose from '../DetailedDiagnose'
import { OFFSET_THRESHOLD_TO_SNAP_FLATLIST } from './constants'
import styles from './styles'

const MyDiagnoses = () => {
  const flatListRef = useRef()
  const [diagnoses, setDiagnoses] = useState(null)
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(true)
  const [downloadingDiagnosesWhenNoDiagnoses, setDownloadingDiagnosesWhenNoDiagnoses] = useState(true)
  const [refetch, toggleRefetch] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  AnalyticsService.setCurrentScreenName('My Diagnoses')

  const refetchDiagnoses = () => {
    toggleRefetch(!refetch)
  }

  const getRenderedDiagnoses = async () => {
    setDownloadingDiagnosesWhenNoDiagnoses(true)
    setRefreshing(true)
    try {
      const downloadedData = await DatabaseService.getDiagnosesFromCurrentUser()

      const downloadedDataWithThumbnail = await Promise.all(
        downloadedData.map(async (diagnose, index) => {
          diagnose.thumbnail = await getURL(diagnose.imageReferences[0])
          return diagnose
        })
      )

      const sortedData = sortDiagnosesByMostRecentCreation(downloadedDataWithThumbnail)
      const renderedDiagnoses = renderDiagnoses(sortedData)

      setDiagnoses(renderedDiagnoses)
    } catch (error) {
      setDiagnoses(null)
    } finally {
      setDownloadingDiagnoses(false)
      setDownloadingDiagnosesWhenNoDiagnoses(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (refetch !== null) {
      getRenderedDiagnoses()
    }
  }, [refetch])

  if (!isNull(diagnoses) && isEmpty(diagnoses)) {
    return (
      <Background>
        <ForceRerenderOnNavigation resetStateFunction={refetchDiagnoses} />
        <NoDiagnoses />
        <View style={styles.noDiagnosesActivityIndicator}>
          {downloadingDiagnosesWhenNoDiagnoses && <ActivityIndicator size='large' />}
        </View>
      </Background>
    )
  }

  return (
    <Background>
      <View style={styles.container}>
        <ForceRerenderOnNavigation resetStateFunction={refetchDiagnoses} />
        <Header isScrolling={scrolling} />
        {downloadingDiagnoses && <ActivityIndicator size='large' />}
        {diagnoses &&
          <FlatList
            ref={flatListRef}
            data={diagnoses}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => item}
            keyExtractor={item => String(diagnoses.indexOf(item))}
            onRefresh={getRenderedDiagnoses}
            refreshing={refreshing}
            disableVirtualization={false}
            onScrollBeginDrag={() => setScrolling(true)}
            onScrollEndDrag={({ nativeEvent }) => {
              const snapToTopIfScrollingNearTheFirstElement = () => {
                if (nativeEvent.contentOffset.y < OFFSET_THRESHOLD_TO_SNAP_FLATLIST) {
                  flatListRef.current.scrollToIndex({ animated: true, index: 0 })
                  setScrolling(false)
                } else {
                  setScrolling(true)
                }
              }

              snapToTopIfScrollingNearTheFirstElement()
            }}
            contentContainerStyle={styles.flatListContainer}
          />}
      </View>
    </Background>
  )
}

MyDiagnoses.navigationOptions = () => ({
  header: null
})

const MyDiagnosesStack = createStackNavigator({
  MyDiagnoses: MyDiagnoses,
  DetailedDiagnose: DetailedDiagnose
})

export default MyDiagnosesStack
