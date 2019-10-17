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
  loginForm: {
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
  loginButton: {
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
  loginImage: {
    width: 163,
    height: 163,
    top: 57,
    right: 10
  },
  haveAccount: {
    bottom: 25
  },
  doesntHaveAccount: {
    bottom: 25
  },
  errorMessage: {
    paddingLeft: 20
  }
})

export default styles
