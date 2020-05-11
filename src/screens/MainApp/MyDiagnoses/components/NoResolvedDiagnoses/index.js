import React from 'react'
import { SvgXml } from 'react-native-svg'
import Background from '~/components/Background'
import { Description } from '~/components/texts'
import emptyBoxIcon from '~/assets/images/emptyBoxIconOutline.svg'
import styles, { ICON_WIDTH, ICON_HEIGHT } from './styles'

const NoDiagnoses = () => (
  <Background style={styles.container}>
    <SvgXml
      style={styles.icon}
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      xml={emptyBoxIcon}
    />
    <Description gray style={styles.description}>
      Aún no tenés consultas resueltas
    </Description>
  </Background>
)

export default NoDiagnoses
