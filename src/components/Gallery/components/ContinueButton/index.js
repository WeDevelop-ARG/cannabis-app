import React from 'react'
import { PrimaryButton } from '~/components/buttons'
import { Description } from '~/components/texts'
import styles from './styles'

const ContinueButton = ({ onPress }) => {
  return (
    <PrimaryButton
      style={styles.button}
      onPress={onPress}
    >
      <Description white>Continuar</Description>
    </PrimaryButton>
  )
}

export default ContinueButton
