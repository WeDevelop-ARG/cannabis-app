import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const colors = {
  primary: 'rgba(92, 254, 78, 0.71)',
  secondary: 'rgba(254,93,78, 0.8)',
  black: '#2F2F2F',
  white: '#FFFFFF',
  gray: '#BDBFC7',
  gray2: '#D8D8D8',
  gray3: '#F0F0F0'
}

const sizes = {
  // global sizes
  base: moderateScale(20),
  font: moderateScale(14),
  border: moderateScale(30),
  padding: moderateScale(10),
  margin: moderateScale(15),

  // font sizes
  h1: moderateScale(22),
  h2: moderateScale(18),
  h3: moderateScale(16),
  description: moderateScale(18),
  body: moderateScale(14),
  date: moderateScale(12)
}

const fonts = {
  h1: {
    fontFamily: 'Roboto',
    fontSize: sizes.h1,
    fontWeight: 'bold'
  },
  h2: {
    fontFamily: 'Roboto',
    fontSize: sizes.h2,
    fontWeight: 'bold'
  },
  h3: {
    fontFamily: 'Roboto',
    fontSize: sizes.h3,
    fontWeight: 'bold'
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: sizes.description,
    fontWeight: 'normal'
  },
  body: {
    fontFamily: 'Roboto',
    fontSize: sizes.body,
    fontWeight: 'normal'
  },
  date: {
    fontFamily: 'Roboto',
    fontSize: sizes.date,
    fontWeight: '500'
  }
}

export { colors, sizes, fonts }
