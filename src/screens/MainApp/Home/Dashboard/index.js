import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import DiagnosesBoard from './DiagnosesBoard'
import CreateDiagnoseBoard from './CreateDiagnoseBoard'
import NavigationService from '~/navigationService'
import AppText from '~/helpers/AppText'

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Dr. Cannabis
      </AppText>
      <View style={styles.body}>
        <CreateDiagnoseBoard handleGoToCreateDiagnoseScreen={() => { NavigationService.navigate('DiagnoseRequest') }} />
        <DiagnosesBoard />
      </View>
    </View>
  )
}

export default Dashboard
