import React, { useCallback } from 'react'
import { View, BackHandler } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { BackButton } from '~/components/buttons'
import Background from '~/components/Background'
import { Description, PrimaryButton, Title } from '~/components'
import logo from '~/assets/images/NoConnection/logo.svg'
import styles, { LOGO_HEIGHT, LOGO_WIDTH } from './styles'
import useNetworkListener from '~/hooks/useNetworkListener'

const NoConnection = ({ navigation }) => {
  const [isInternetReachable] = useNetworkListener()

  const onBackButtonPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const onRetryPress = useCallback(() => {
    if (isInternetReachable) {
      navigation.goBack()
    }
  }, [navigation, isInternetReachable])

  return (
    <Background style={styles.container}>
      <View style={styles.header}>
        <BackButton style={styles.backButton} onPress={onBackButtonPress} />
      </View>
      <SvgXml width={LOGO_WIDTH} height={LOGO_HEIGHT} style={styles.logo} xml={logo} />
      <Title style={styles.title}>Sin conexión</Title>
      <Description gray style={styles.description}>Verificá el estado de conexión de tu red para seguir navegando</Description>
      <PrimaryButton style={styles.button} onPress={onRetryPress}>
        <Description white>Intentar nuevamente</Description>
      </PrimaryButton>
    </Background>
  )
}

NoConnection.navigationOptions = () => ({
  header: null
})

export default NoConnection
