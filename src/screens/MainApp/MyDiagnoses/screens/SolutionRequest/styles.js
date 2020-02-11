import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  scroll: {
    padding: theme.sizes.margin * 2
  },
  logo: {
    marginTop: verticalScale(56),
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginTop: verticalScale(30)
  },
  input: {
    backgroundColor: theme.colors.white,
    color: theme.colors.black,
    textAlignVertical: 'top',
    padding: theme.sizes.padding * 2,
    borderRadius: moderateScale(5),
    height: verticalScale(90),
    ...theme.fonts.body
  },
  description: {
    textAlign: 'center',
    marginTop: verticalScale(12)
  },
  button: {
    width: '100%'
  },
  shadow: {
    marginTop: verticalScale(50)
  },
  cancel: {
    marginRight: scale(20)
  }
})

export default styles
