import React from 'react'
import { SvgXml } from 'react-native-svg'
import Background from '~/components/Background'
import { Subtitle, Description } from '~/components/texts'
import { PrimaryButton } from '~/components/buttons'
import NavigationService from '~/navigationService'
import icon from '~/assets/images/MyDiagnoses/NoDiagnosesIcon.svg'
import styles, { ICON_WIDTH, ICON_HEIGHT } from './styles'

const goToRequest = () => {
  NavigationService.navigate('DiagnoseRequest')
}

const NoDiagnosesYet = () => (
  <Background style={styles.container}>
    <SvgXml
      style={styles.icon}
      xml={icon}
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
    />
    <Subtitle style={styles.title}>
      Aún no realizaste ninguna consulta!
    </Subtitle>
    <Description gray style={styles.description}>
      Tus nuevas consultas van a aparecer acá. ¡Sacate todas las dudas con nuestros expertos!
    </Description>
    <PrimaryButton
      style={styles.CTA}
      onPress={goToRequest}
    >
      <Description white>Hacé una nueva consulta</Description>
    </PrimaryButton>
  </Background>
)

export default NoDiagnosesYet
