import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  diagnoseContainer: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center'
  },
  answerContainer: {
    marginLeft: 10,
    width: '90%'
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  answeredBy: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    width: '90%'
  },
  answer: {
    width: '90%'
  }
})

export default styles
