import React from 'react'
import { SvgXml } from 'react-native-svg'
import Background from '~/components/Background'
import { Description } from '~/components/texts'
import { PrimaryButton } from '~/components/buttons'
import NavigationService from '~/navigationService'
import outline from '~/assets/images/DetailedDiagnose/noCommentsYetOutline.svg'
import styles, { ICON_WIDTH, ICON_HEIGHT } from './styles'

const goToRequest = () => {
  NavigationService.navigate('DiagnoseRequest')
}

const NoDiagnoses = ({ tab }) => (
  <Background style={styles.container}>
    <SvgXml
      style={styles.icon}
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      xml={outline}
    />
    {tab === 'OpenDiagnoses'
      ? (
        <Description gray style={styles.description}>
          ¡Parece que resolviste todas tus consultas!
        </Description>
      ) : (
        <Description gray style={styles.description}>
          Aún no tenés consultas resueltas
        </Description>)}
    {(tab === 'OpenDiagnoses') &&
      <PrimaryButton
        style={styles.CTA}
        onPress={goToRequest}
      >
        <Description white>Hacé una nueva consulta</Description>
      </PrimaryButton>}
  </Background>
)

export default NoDiagnoses
