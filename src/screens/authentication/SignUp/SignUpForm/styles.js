import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  signUpError: {
    textAlign: 'center',
    color: 'white'
  },
  signUpForm: {
    width: '75%',
    margin: '25%'
  },
  signUpButton: {
    backgroundColor: 'rgba(92, 254, 78, 0.71)',
    borderRadius: 40,
    margin: 30,
    padding: 10,
    alignSelf: 'center'
  },
  signUpText: {
    color: 'white'
  },
  errorMessage: {
    paddingLeft: 20,
    color: 'white'
  },
  label: {
    margin: 13,
    paddingLeft: 15,
    backgroundColor: 'rgba(254,93,78, 0.8)',
    color: 'white',
    textDecorationLine: 'none',
    borderRadius: 40
  }
})

export default styles
