import React, { useEffect } from 'react'
import { ScrollView, BackHandler } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Subtitle, Description, PrimaryButton } from '~/components'
import * as AnalyticsService from '~/analyticsService'
import Background from '~/components/Background'
import styles from './styles'
import logo from '~/assets/images/FinishScreen/logo.svg'

const FinishScreen = ({ navigation }) => {
  AnalyticsService.setCurrentScreenName('Finish Screen')

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.popToTop()

      return true
    })
    return () => handler.remove()
  }, [])

  const goToRequestNewDiagnose = () => {
    navigation.popToTop()
    navigation.navigate('DiagnoseRequest')
  }

  const goToMyRequests = () => {
    navigation.popToTop()
    navigation.navigate('MyDiagnoses')
  }

  return (
    <Background style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SvgXml xml={logo} style={styles.logo} />
        <Subtitle black style={styles.title}>Listo! Tu consulta fue resuelta</Subtitle>
        <Description gray style={styles.description}>Nos alegra que nuestros expertos hayan podido ayudarte.</Description>
        <PrimaryButton style={styles.button} onPress={goToRequestNewDiagnose}>
          <Description white>Solicitar nueva consulta</Description>
        </PrimaryButton>
        <Description primary style={styles.link} onPress={goToMyRequests}>Ver consultas</Description>
      </ScrollView>
    </Background>
  )
}

FinishScreen.navigationOptions = {
  title: 'Resolver solicitud',
  headerLeft: null,
  headerRight: null
}

export default FinishScreen
