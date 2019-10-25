import React from 'react'
import { TouchableImage } from '~/helpers/TouchableImage'
import styles from './styles'
import diagnoseSubmitIcon from './resources/diagnoseSubmit.png'

const DiagnoseSubmit = ({ onPress }) => (
  <TouchableImage
    style={styles.diagnoseSubmit}
    onPress={onPress}
    source={diagnoseSubmitIcon}
  />
)

export default DiagnoseSubmit
