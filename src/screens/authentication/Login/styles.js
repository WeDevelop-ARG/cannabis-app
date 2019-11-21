import React from 'react'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { scale, verticalScale } from 'react-native-size-matters'

const marginVerticalBase = {
  marginVertical: verticalScale(15)
}

const AuthButtonStyle = {
  width: widthPercentageToDP('80%'),
  ...marginVerticalBase,
  alignSelf: 'center',
  borderRadius: scale(5)
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
  welcomeMessage: {
    width: widthPercentageToDP('60%'),
    alignSelf: 'center',
    fontSize: scale(32),
    color: 'white',
    ...marginVerticalBase
  },
  googleButton: {
    ...AuthButtonStyle,
    padding: verticalScale(5)
  },
  optionDisclaimer: {
    fontSize: scale(18),
    textAlign: 'center',
    color: 'white',
    ...marginVerticalBase
  },
  emailButton: {
    ...AuthButtonStyle,
    borderWidth: 1,
    borderColor: 'white'
  },
  emailButtonText: {
    textAlign: 'center',
    fontSize: scale(14),
    marginVertical: verticalScale(5),
    color: 'white'
  }
})

export default styles
