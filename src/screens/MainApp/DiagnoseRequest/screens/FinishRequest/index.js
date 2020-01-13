import React from 'react'
import { View, ScrollView } from 'react-native'
import { Subtitle, Description, PrimaryButton } from '~/components'
import styles from './styles'
import { SvgXml } from 'react-native-svg'
import Logo from './resources/logo.svg'

const FinishRequest = ({ navigation }) => {
  const goToRequestNewDiagnose = () => {
    navigation.popToTop()
  }

  const goToMyRequests = () => {
    navigation.popToTop()
    navigation.navigate('MyDiagnoses')
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SvgXml xml={Logo} style={styles.logo} />
        <Subtitle black style={styles.title}>Listo! Ya enviaste tu consulta</Subtitle>
        <Description gray style={styles.description}>En breve nuestros expertos comenzarán a responederte.</Description>
        <PrimaryButton style={styles.button} onPress={goToRequestNewDiagnose}>
          <Description white>Solicitar nueva consulta</Description>
        </PrimaryButton>
        <Description primary style={styles.link} onPress={goToMyRequests}>Ver consultas</Description>
      </ScrollView>
    </View>
  )
}

FinishRequest.navigationOptions = {
  title: 'Nueva consulta',
  headerLeft: null
}

export default FinishRequest
