import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { ForceRerenderOnNavigation } from '~/navigationService'
import * as AnalyticsService from '~/analyticsService'
import { getDiagnosesFromDatabase, getDiagnosesFromAnswers, sortByCreatedAt } from './utils'
import styles from './styles'

const DiagnoseResponse = () => {
  const [diagnoses, setDiagnoses] = useState(null)
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(true)
  const [refetchTrigger, toggleRefetch] = useState(false)

  AnalyticsService.setCurrentScreenName('Diagnose Response')

  const refetchDiagnoses = () => {
    // Tab navigator doesn't unmount components, we need this to refetch need data when pressing DiagnoseResponse tab.
    // alternative is to add a query snapshot listener, so that new changes in the database trigger a re-render automatically.
    toggleRefetch(!refetchTrigger)
  }

  const buildDiagnoses = async () => {
    setDownloadingDiagnoses(true)
    try {
      const answers = sortByCreatedAt(await getDiagnosesFromDatabase())
      const diagnoses = await getDiagnosesFromAnswers(answers)
      setDiagnoses(diagnoses)
    } catch (error) {
      setDiagnoses(null)
    }
    setDownloadingDiagnoses(false)
  }

  useEffect(() => {
    buildDiagnoses()
  }, [refetchTrigger])

  return (
    <View style={styles.container}>
      {downloadingDiagnoses && <ActivityIndicator style={styles.downloadingIndicator} />}
      <ForceRerenderOnNavigation resetStateFunction={refetchDiagnoses} />
      <SafeAreaView>
        <ScrollView>
          {diagnoses}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default DiagnoseResponse
