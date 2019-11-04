import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ActivityIndicator } from 'react-native'
import styles from './styles'
import BoardItem from './BoardItem'
import { getDiagnosesFromCurrentUser } from '~/databaseService'
import * as StorageService from '~/storageService'
import { ForceRerenderOnNavigation } from '~/navigationService'
import AppText from '~/helpers/AppText'
import { ScrollView } from 'react-native-gesture-handler'

const getURL = async (imageReference) => {
  try {
    return await StorageService.getDownloadURL(imageReference)
  } catch (error) {
    return null
  }
}

const buildBoardItems = async (downloadedData) => (
  downloadedData.reduce(
    async (boardItems, diagnose, index) => {
      boardItems = await boardItems
      const boardItem = await getBoardItemFromDiagnose(diagnose, index)
      boardItems.push(boardItem)

      return boardItems
    },
    Promise.resolve([])
  )
)

const getBoardItemFromDiagnose = async (diagnose, key) => {
  const thumbnail = await getURL(diagnose.imageReferences[0])
  return (
    <BoardItem
      key={key}
      thumbnail={thumbnail}
      diagnose={diagnose}
    />
  )
}

const sortDiagnosesByMostRecentCreation = (Diagnoses) => (
  Diagnoses.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
)

const DiagnosesBoard = () => {
  const [diagnoses, setDiagnoses] = useState(null)
  const [downloadingDiagnoses, setDownloadingDiagnoses] = useState(false)
  const [refetchTrigger, toggleRefetch] = useState(false)

  const refetchDiagnoses = () => {
    // Tab navigator doesn't unmount components, we need this to refetch need data when pressing DiagnoseResponse tab.
    // alternative is to add a query snapshot listener, so that new changes in the database trigger a re-render automatically.
    toggleRefetch(!refetchTrigger)
  }

  const getDiagnosesFromDatabase = async () => {
    setDownloadingDiagnoses(true)
    try {
      const downloadedData = await getDiagnosesFromCurrentUser()
      const sortedData = sortDiagnosesByMostRecentCreation(downloadedData)
      const diagnoses = await buildBoardItems(sortedData)
      setDiagnoses(diagnoses)
    } catch (error) {
      setDiagnoses(null)
    }
    setDownloadingDiagnoses(false)
  }

  useEffect(() => {
    getDiagnosesFromDatabase()
  }, [refetchTrigger])

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Diagnósticos
      </AppText>
      <View style={styles.listContainer}>
        {downloadingDiagnoses && <ActivityIndicator style={styles.downloadingIndicator} />}
        <ForceRerenderOnNavigation resetStateFunction={refetchDiagnoses} />
        <SafeAreaView>
          <ScrollView>
            {diagnoses}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  )
}

export default DiagnosesBoard
