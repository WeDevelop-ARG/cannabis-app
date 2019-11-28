import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { scale, verticalScale } from 'react-native-size-matters'

const marginVerticalBase = {
  marginVertical: verticalScale(30)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drCannabisIcon: {
    width: scale(150),
    height: verticalScale(150),
    alignSelf: 'center',
    ...marginVerticalBase
  },
  information: {
    width: widthPercentageToDP('80%'),
    fontSize: scale(16),
    alignSelf: 'center',
    color: 'white'
  },
  usernameTag: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: scale(40),
    ...marginVerticalBase
  },
  textInput: {
    color: 'white',
    width: widthPercentageToDP('80%'),
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: scale(1),
    borderRadius: scale(10),
    textAlign: 'center'
  },
  error: {
    position: 'absolute',
    top: heightPercentageToDP('60%'),
    color: 'rgba(254,93,78, 0.98)',
    alignSelf: 'center',
    fontSize: scale(14)
  },
  submitIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: heightPercentageToDP('60%')
  },
  submitButton: {
    marginVertical: scale(40),
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    alignSelf: 'center',
    borderRadius: scale(15),
    backgroundColor: 'rgba(92, 254, 78, 0.71)'
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white'
  }
})

export default styles
