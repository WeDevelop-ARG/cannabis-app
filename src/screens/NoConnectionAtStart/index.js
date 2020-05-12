import React, { useCallback } from 'react'
import { BackHandler } from 'react-native'
import NoConnection from '~/components/NoConnection'

const NoConnectionAtStart = () => {
  const onPressExitApp = useCallback(() => {
    BackHandler.exitApp()
  }, [])

  return (
    <NoConnection onBackButtonPress={onPressExitApp} onRetryPress={onPressExitApp} />
  )
}

NoConnectionAtStart.navigationOptions = () => ({
  header: null
})

export default NoConnectionAtStart
