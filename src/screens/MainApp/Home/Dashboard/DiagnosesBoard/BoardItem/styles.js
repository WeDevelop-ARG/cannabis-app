import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    borderWidth: 4,
    borderColor: '#00000022',
    backgroundColor: '#FFFFFFB2'
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFFB2',
    padding: 5,
    maxHeight: 200
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  body: {
    padding: 6
  },
  problemInfo: {
    paddingBottom: 5,
    paddingTop: 3
  },
  diagnoseStateContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dateContainer: {
    flexDirection: 'row'
  },
  titleDate: {
    textAlign: 'right',
    alignSelf: 'center',
    fontSize: 12,
    margin: widthPercentageToDP('1%')
  },
  answered: {
    maxHeight: 30,
    maxWidth: 30,
    marginLeft: 5
  },
  notAnswered: {
    maxHeight: 30,
    maxWidth: 30,
    marginLeft: 5
  }
})

export default styles
