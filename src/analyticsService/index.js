import analytics from '@react-native-firebase/analytics'
import AnalyticsError from '~/AppErrors/AnalyticsError'

export const logEvent = async (eventName, data = {}) => {
  try {
    await analytics().logEvent(eventName, data)
  } catch (error) {
    throw new AnalyticsError(error.message)
  }
}
