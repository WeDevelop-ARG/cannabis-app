import React from 'react'
import { AlphaButton } from '~/components/buttons'
import { Description } from '~/components/texts'

const AddMoreImagesButton = ({ onPress }) => (
  <AlphaButton onPress={onPress}>
    <Description primary>Cargar más fotos</Description>
  </AlphaButton>
)

export default AddMoreImagesButton
