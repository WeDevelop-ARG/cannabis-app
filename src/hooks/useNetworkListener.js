import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'

const useNetworkListener = () => {
  const [isInternetReachable, setIsInternetReachable] = useState(null)

  useEffect(() => {
    const unsuscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(state.isInternetReachable)
    })

    return unsuscribe
  }, [])

  return [isInternetReachable]
}

export default useNetworkListener
