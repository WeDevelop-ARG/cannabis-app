import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signUpForm: {
    width: '75%',
    margin: '25%'
  },
  label: {
    margin: 13,
    paddingLeft: 15,
    backgroundColor: 'rgba(254,93,78, 0.8)',
    color: 'white',
    textDecorationLine: 'none',
    borderRadius: 40
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  signUpButton: {
    backgroundColor: 'rgba(92, 254, 78, 0.71)',
    borderRadius: 40,
    margin: 30,
    padding: 10,
    alignSelf: 'center'
  },
  whiteText: {
    color: 'white'
  },
  underlineText: {
    textDecorationLine: 'underline'
  },
  signUpImage: {
    width: 163,
    height: 163,
    top: 57
  },
  hasAccount: {
    marginBottom: '10%'
  },
  errorMessage: {
    paddingLeft: 20
  }
})

export default styles
