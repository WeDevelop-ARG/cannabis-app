import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import DiagnosesBoard from './DiagnosesBoard'
import NewDiagBoard from './NewDiagnoseBoard'
import NavigationService from '~/navigationService'

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dr Cannabis
      </Text>
      <View style={styles.body}>
        <NewDiagBoard handleRedirectFunc={() => { NavigationService.navigate('DiagnoseRequest') }} />
        <DiagnosesBoard />
      </View>
    </View>
  )
}

export default Dashboard