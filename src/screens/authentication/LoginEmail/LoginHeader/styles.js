import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  loginImage: {
    width: 163,
    height: 163,
    top: heightPercentageToDP('10%'),
    right: 10
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    top: heightPercentageToDP('15%'),
    right: widthPercentageToDP('25%')
  }
})

export default styles
