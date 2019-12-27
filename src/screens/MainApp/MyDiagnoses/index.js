import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { isNull, isEmpty } from 'lodash'
import { ForceRerenderOnNavigation } from '~/navigationService'
import * as DatabaseService from '~/databaseService'
import { sortDiagnosesByMostRecentCreation } from '~/mixins/diagnose'
import { getURL } from '~/mixins/storage'
import { renderDiagnoses } from './renderUtilities'
import NoDiagnoses from './NoDiagnoses'
import DetailedDiagnose from '../DetailedDiagnose'
import styles from './styles'

const MyDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState(null)
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(true)
  const [refetchTrigger, toggleRefetch] = useState(false)

  const refetchDiagnoses = () => {
    toggleRefetch(!refetchTrigger)
  }

  const getRenderedDiagnoses = async () => {
    setDownloadingDiagnoses(true)
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
    }
  }

  useEffect(() => {
    getRenderedDiagnoses()
  }, [refetchTrigger])

  if (!isNull(diagnoses) && isEmpty(diagnoses)) {
    return <NoDiagnoses />
  }

  return (
    <View style={styles.container}>
      <ForceRerenderOnNavigation resetStateFunction={refetchDiagnoses} />
      {downloadingDiagnoses && <ActivityIndicator size='large' />}
      {diagnoses &&
        <FlatList
          data={diagnoses}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => item}
          keyExtractor={item => String(diagnoses.indexOf(item))}
        />}
    </View>
  )
}

MyDiagnoses.navigationOptions = () => ({
  title: 'Mis solicitudes',
  headerTitleStyle: styles.headerTitleStyle
})

const MyDiagnosesStack = createStackNavigator({
  MyDiagnoses: MyDiagnoses,
  DetailedDiagnose: DetailedDiagnose
})

export default MyDiagnosesStack
