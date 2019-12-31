import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const colors = {
  primary: '#5ECE84',
  secondary: '#FE9458',
  black: '#4B5057',
  white: '#FFFFFF',
  gray: '#A6AFBC',
  gray2: '#D3D5D8',
  gray3: '#FAFAFA',
  alpha: 'rgba(255, 255, 255, 0.01)'
}

const sizes = {
  // global sizes
  base: moderateScale(40, 0.25),
  font: moderateScale(14, 0.25),
  border: moderateScale(7, 0.25),
  padding: moderateScale(6, 0.25),
  margin: moderateScale(12, 0.25),
  containerWidth: widthPercentageToDP('88%'),

  // font sizes
  h1: moderateScale(20, 0.25),
  h2: moderateScale(18, 0.25),
  h3: moderateScale(16, 0.25),
  h4: moderateScale(14, 0.25),
  description: moderateScale(16, 0.25),
  body: moderateScale(14, 0.25),
  date: verticalScale(12)
}

const fonts = {
  h1: {
    fontFamily: 'raleway-bold',
    fontSize: sizes.h1
  },
  h2: {
    fontFamily: 'raleway-bold',
    fontSize: sizes.h2
  },
  h3: {
    fontFamily: 'raleway-bold',
    fontSize: sizes.h3
  },
  h4: {
    fontFamily: 'raleway-bold',
    fontSize: sizes.h4
  },
  description: {
    fontFamily: 'red-hat-display-regular',
    fontSize: sizes.description
  },
  body: {
    fontFamily: 'red-hat-display-regular',
    fontSize: sizes.body
  },
  date: {
    fontFamily: 'red-hat-display-medium',
    fontSize: sizes.date
  }
}

export { colors, sizes, fonts }
