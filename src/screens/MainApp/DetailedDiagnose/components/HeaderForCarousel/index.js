import React, { memo } from 'react'
import { View } from 'react-native'
import pluralize from 'pluralize'
import { BackButton, SvgButton } from '~/components/buttons'
import { Body } from '~/components/texts'
import styles, { BACK_BUTTON_COLOR } from './styles'
import threeDotsIcon from '~/assets/images/DetailedDiagnose/threeDots.svg'
import { scale, verticalScale } from 'react-native-size-matters'

const PhotoQuantity = ({ quantity }) => (
  <View style={styles.photoQuantityContainer}>
    <Body white>{quantity} {pluralize('Foto', quantity)}</Body>
  </View>
)

const ThreeDotsButton = ({ onPress }) => (
  <SvgButton
    svg={threeDotsIcon}
    onPress={onPress}
    buttonStyle={styles.threeDotsButton}
    width={scale(22)}
    height={verticalScale(22)}
  />
)

const Header = ({ photoQuantity, onGoBack, onThreeDotsPress }) => (
  <View style={styles.headerContainer}>
    <BackButton
      style={styles.backButton}
      onPress={onGoBack}
      color={BACK_BUTTON_COLOR}
    />
    <View style={styles.rightContainer}>
      <PhotoQuantity quantity={photoQuantity} />
      <ThreeDotsButton onPress={onThreeDotsPress} />
    </View>
  </View>
)

export default memo(Header)
