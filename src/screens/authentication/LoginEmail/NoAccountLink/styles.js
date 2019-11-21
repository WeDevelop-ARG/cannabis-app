import { StyleSheet } from 'react-native'
import { heightPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  noAccountText: {
    color: 'white',
    bottom: heightPercentageToDP('10')
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
})

export default styles
