import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  loginError: {
    textAlign: 'center',
    color: 'white'
  },
  loginForm: {
    width: widthPercentageToDP('75%'),
    margin: heightPercentageToDP('15%')
  },
  loginButton: {
    backgroundColor: 'rgba(92, 254, 78, 0.71)',
    borderRadius: 40,
    margin: heightPercentageToDP('5%'),
    padding: 10,
    alignSelf: 'center'
  },
  loginText: {
    color: 'white'
  },
  errorMessage: {
    paddingLeft: 20,
    color: 'white'
  },
  label: {
    margin: heightPercentageToDP('1'),
    padding: heightPercentageToDP('1'),
    paddingLeft: 15,
    backgroundColor: 'rgba(254,93,78, 0.8)',
    color: 'white',
    textDecorationLine: 'none',
    borderRadius: 40
  }
})

export default styles
