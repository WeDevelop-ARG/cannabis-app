import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const colors = {
  primary: '#5ECE84',
  secondary: '#FE9458',
  black: '#4B5057',
  white: '#FFFFFF',
  gray: '#A6AFBC',
  gray2: '#D3D5D8',
  gray3: '#FAFAFA',
  alpha: 'rgba(255, 255, 255, 0.01)',
  background: '#FAFAFA'
}

const sizes = {
  // global sizes
  base: moderateScale(40, 1),
  font: moderateScale(14, 1),
  border: moderateScale(7, 1),
  padding: moderateScale(6, 1),
  margin: moderateScale(12, 1),
  containerWidth: widthPercentageToDP('88%'),

  // font sizes
  h1: moderateScale(20, 1),
  h2: moderateScale(18, 1),
  h3: moderateScale(16, 1),
  h4: moderateScale(14, 1),
  description: moderateScale(16, 1),
  body: moderateScale(14, 1),
  date: moderateScale(12, 1)
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

const shadows = {
  ...Platform.select({
    ios: {
      shadowColor: '#F0F0F0',
      shadowRadius: 2,
      shadowOffset: { width: 2, height: 5 },
      shadowOpacity: 0.16
    },
    android: {
      elevation: 1
    }
  })
}

export { colors, sizes, fonts, shadows }
