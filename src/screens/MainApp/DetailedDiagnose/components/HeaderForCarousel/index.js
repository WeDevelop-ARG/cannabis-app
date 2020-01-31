import React, { memo } from 'react'
import { View } from 'react-native'
import pluralize from 'pluralize'
import { BackButton } from '~/components/buttons'
import { Body } from '~/components/texts'
import styles, { BACK_BUTTON_COLOR } from './styles'

const PhotoQuantity = ({ quantity }) => (
  <View style={styles.photoQuantityContainer}>
    <Body white>{quantity} {pluralize('Foto', quantity)}</Body>
  </View>
)

const Header = ({ photoQuantity, onGoBack }) => (
  <View style={styles.headerContainer}>
    <BackButton
      style={styles.backButton}
      onPress={onGoBack}
      color={BACK_BUTTON_COLOR}
    />
    <PhotoQuantity quantity={photoQuantity} />
  </View>
)

export default memo(Header)
