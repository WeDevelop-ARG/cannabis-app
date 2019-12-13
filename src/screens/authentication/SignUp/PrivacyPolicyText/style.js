import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP('60%'),
    position: 'absolute',
    bottom: theme.sizes.margin * 2
  },
  policyText: {
    textAlign: 'center'
  },
  link: {
    textDecorationLine: 'underline'
  }
})

export default styles
