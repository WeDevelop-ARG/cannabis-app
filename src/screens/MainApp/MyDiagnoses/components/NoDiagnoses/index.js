import React from 'react'
import Background from '~/components/Background'
import { Subtitle, Description } from '~/components/texts'
import { PrimaryButton } from '~/components/buttons'
import NavigationService from '~/navigationService'
import styles from './styles'

const goToRequest = () => {
  NavigationService.navigate('DiagnoseRequest')
}

const NoDiagnoses = () => (
  <Background style={styles.container}>
    <Subtitle>Todavía no hay solicitudes!</Subtitle>
    <PrimaryButton
      style={styles.CTA}
      onPress={goToRequest}
    >
      <Description white>Haz una!</Description>
    </PrimaryButton>
  </Background>
)

export default NoDiagnoses
