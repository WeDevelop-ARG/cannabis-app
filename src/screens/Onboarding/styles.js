import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  carouselContainer: {
    height: verticalScale(500),
    borderRadius: moderateScale(30),
    padding: moderateScale(10)
  },
  paginationDot: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    marginHorizontal: scale(3),
    borderColor: 'rgba(59, 210, 59, 0.92)',
    borderWidth: scale(3),
    backgroundColor: 'rgba(68, 135, 68, 0.01)'
  },
  inactivePaginationDot: {
    borderColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: scale(3),
    backgroundColor: 'rgba(60, 60, 60, 0.01)'
  },
  continueButton: {
    margin: verticalScale(15)
  },
  continueButtonText: {
    color: 'white',
    fontSize: scale(14)
  }
})

export default styles
