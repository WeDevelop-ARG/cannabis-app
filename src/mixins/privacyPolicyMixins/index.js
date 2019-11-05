import { Linking } from 'react-native'
import privacyPolicy from '~/configs/privacyPolicy'

export const goToPrivacyPolicyURL = async () => {
  try {
    await Linking.openURL(privacyPolicy.url)
  } catch (error) {
    console.log(error.message)
  }
}
