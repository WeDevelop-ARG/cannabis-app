import React from 'react'
import { PrimaryButton, GrayButton } from '~/components/buttons'
import { Description } from '~/components/texts'
import styles from './styles'

const ConfirmButton = ({ errorState, onConfirm }) => (
  <>
    {errorState
      ? (
        <GrayButton
          style={styles.button}
        >
          <Description white>Confirmar</Description>
        </GrayButton>
      )
      : (
        <PrimaryButton
          style={styles.button}
          onPress={onConfirm}
        >
          <Description white>Confirmar</Description>
        </PrimaryButton>
      )}
  </>
)

export default ConfirmButton
