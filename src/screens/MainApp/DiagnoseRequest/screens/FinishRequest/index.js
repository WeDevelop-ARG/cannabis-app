import React from 'react'
import { ScrollView, BackHandler } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Subtitle, Description, PrimaryButton } from '~/components'
import * as AnalyticsService from '~/analyticsService'
import Background from '~/components/Background'
import Logo from './resources/logo.svg'
import styles from './styles'

const FinishRequest = ({ navigation }) => {
  AnalyticsService.setCurrentScreenName('Finish Request')

  React.useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.popToTop()
      return true
    })
    return () => handler.remove()
  }, [])

  const goToRequestNewDiagnose = () => {
    navigation.popToTop()
    navigation.navigate('Gallery')
  }

  const goToMyRequests = () => {
    navigation.popToTop()
    navigation.navigate('MyDiagnoses')
  }

  return (
    <Background style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SvgXml xml={Logo} style={styles.logo} />
        <Subtitle black style={styles.title}>Listo! Ya enviaste tu consulta</Subtitle>
        <Description gray style={styles.description}>En breve nuestros expertos comenzarán a responderte.</Description>
        <PrimaryButton style={styles.button} onPress={goToRequestNewDiagnose}>
          <Description white>Solicitar nueva consulta</Description>
        </PrimaryButton>
        <Description primary style={styles.link} onPress={goToMyRequests}>Ver consultas</Description>
      </ScrollView>
    </Background>
  )
}

FinishRequest.navigationOptions = {
  title: 'Nueva consulta',
  headerLeft: null
}

export default FinishRequest
