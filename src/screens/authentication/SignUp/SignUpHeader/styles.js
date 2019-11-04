import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  signUpImage: {
    width: 163,
    height: 163,
    top: heightPercentageToDP('15%')
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    top: heightPercentageToDP('15%'),
    right: widthPercentageToDP('25%')
  }
})

export default styles
