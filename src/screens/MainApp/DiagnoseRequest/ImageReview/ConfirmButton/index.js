import React from 'react'
import { Text, Button } from '~/components'

const Error = ({ errorState }) => (
  errorState &&
    <Text
      colorVariant='secondary'
      style={{ alignSelf: 'center' }}
    >Selecciona al menos 3 imagenes para continuar!
    </Text>
)

const ConfirmButton = ({ errorState, onConfirm }) => (
  <>
    <Error errorState={errorState} />
    <Button
      onPress={onConfirm}
      variant={errorState ? 'gray3' : 'gray'}
      style={{ alignSelf: 'center' }}
      disabled={errorState}
    >
      <Text>Confirmar</Text>
    </Button>
  </>
)

export default ConfirmButton
