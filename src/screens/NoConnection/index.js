import React, { useCallback } from 'react'
import NoConnection from '~/components/NoConnection'
import useNetworkListener from '~/hooks/useNetworkListener'

const NoConnectionScreen = ({ navigation }) => {
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
    <NoConnection onBackButtonPress={onBackButtonPress} onRetryPress={onRetryPress} />
  )
}

NoConnectionScreen.navigationOptions = () => ({
  header: null
})

export default NoConnectionScreen
