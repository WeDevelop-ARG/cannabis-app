import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'
import crossSVG from '~/assets/images/DetailedDiagnose/x.svg'

const WIDTH = moderateScale(11, 1)
const HEIGHT = moderateScale(13, 1)

const XClose = ({ style }) => (
  <View style={[styles.elipse, style]}>
    <SvgXml
      style={styles.cross}
      xml={crossSVG}
      width={WIDTH}
      height={HEIGHT}
    />
  </View>
)

const styles = StyleSheet.create({
  elipse: {
    backgroundColor: theme.colors.black,
    borderRadius: moderateScale(10, 1),
    height: moderateScale(20, 1),
    width: moderateScale(20, 1),
    borderColor: theme.colors.white,
    borderWidth: StyleSheet.hairlineWidth * 2
  },
  cross: {
    marginVertical: moderateScale(3, 1),
    marginHorizontal: moderateScale(3, 1),
    padding: 0
  }
})

export default XClose
