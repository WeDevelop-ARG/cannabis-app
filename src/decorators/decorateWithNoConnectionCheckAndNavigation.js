import NavigationService from '~/navigationService'
import isInternetReachable from '~/networkingService/isInternetReachable'

const goToNoConnection = () => NavigationService.navigate('NoConnection')

const decorateWithNoConnectionCheckAndNavigation = (func) => {
  return async (...args) => {
    if (!await isInternetReachable()) return goToNoConnection()
    return func(...args)
  }
}

export default decorateWithNoConnectionCheckAndNavigation
