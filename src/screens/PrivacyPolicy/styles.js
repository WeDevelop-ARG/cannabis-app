import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: widthPercentageToDP('75%')
  },
  disclaimerContainer: {
    backgroundColor: 'rgba(254,93,78, 0.8)',
    padding: heightPercentageToDP('3%'),
    borderRadius: 40
  },
  privacyPolicyURL: {
    fontFamily: 'roboto',
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#F7DAD4'
  },
  disclaimer: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  button: {
    backgroundColor: 'rgba(92, 254, 78, 0.71)',
    borderRadius: 20,
    marginTop: heightPercentageToDP('5%'),
    padding: heightPercentageToDP('2%'),
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  }
})

export default styles
