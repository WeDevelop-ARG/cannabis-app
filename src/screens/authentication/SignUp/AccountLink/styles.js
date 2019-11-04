import { StyleSheet } from 'react-native'
import { heightPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  accountText: {
    color: 'white',
    bottom: heightPercentageToDP('15')
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
})

export default styles
