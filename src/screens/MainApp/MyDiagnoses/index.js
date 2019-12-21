import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { ForceRerenderOnNavigation } from '~/navigationService'
import * as DatabaseService from '~/databaseService'
import { sortDiagnosesByMostRecentCreation } from '~/mixins/diagnose'
import { renderDiagnoses } from './renderUtilities'
import NoDiagnoses from './NoDiagnoses'
import styles from './styles'

const MyDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState(null)
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(null)
  const [refetchTrigger, toggleRefetch] = useState(false)
  const [showNoDiagnosesScreen, setShowNoDiagnosesScreen] = useState(false)

  const refetchDiagnoses = () => {
    // Tab navigator doesn't unmount components, we need this to refetch need data when pressing this tab.
    // alternative is to add a query snapshot listener and a MobX store
    toggleRefetch(!refetchTrigger)
  }

  const getRenderedDiagnoses = async () => {
    setDownloadingDiagnoses(true)
    try {
      const downloadedData = await DatabaseService.getDiagnosesFromCurrentUser()
      const sortedData = sortDiagnosesByMostRecentCreation(downloadedData)
      const renderedDiagnoses = await renderDiagnoses(sortedData)

      setDiagnoses(renderedDiagnoses)
    } catch (error) {
      setDiagnoses(null)
    }
    setDownloadingDiagnoses(false)
  }

  useEffect(() => {
    getRenderedDiagnoses()
  }, [refetchTrigger])

  useEffect(() => {
    const noDiagnoses = () => (
      !diagnoses || (diagnoses && (diagnoses.length === 0))
    )

    if (downloadingDiagnoses === false) {
      if (noDiagnoses()) {
        setShowNoDiagnosesScreen(true)
      }
    }
  }, [downloadingDiagnoses])

  if (showNoDiagnosesScreen) {
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
  MyDiagnoses: MyDiagnoses
})

export default MyDiagnosesStack
