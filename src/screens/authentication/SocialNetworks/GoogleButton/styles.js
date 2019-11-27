import React from 'react'
import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  button: {
    height: verticalScale(30),
    backgroundColor: 'rgba(254,93,78, 0.8)'
  },
  icon: {
    alignSelf: 'center',
    paddingHorizontal: scale(10),
    borderRightColor: 'white',
    borderRightWidth: scale(1)
  },
  text: {
    fontSize: scale(14),
    padding: scale(10),
    color: 'white'
  }
})

export default styles
