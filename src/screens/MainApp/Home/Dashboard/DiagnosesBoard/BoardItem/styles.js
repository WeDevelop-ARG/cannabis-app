import { StyleSheet } from 'react-native'

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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop: 3
  },
  titleDate: {
    textAlign: 'right',
    fontSize: 12
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
  },
  titleText: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: '#000000'
  }
})

export default styles
