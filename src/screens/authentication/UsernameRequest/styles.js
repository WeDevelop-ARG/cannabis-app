import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const marginVerticalBase = {
  marginVertical: theme.sizes.margin
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: heightPercentageToDP('10%')
  },
  drCannabisIcon: {
    width: scale(150),
    height: verticalScale(150),
    alignSelf: 'center',
    ...marginVerticalBase
  },
  information: {
    width: widthPercentageToDP('80%'),
    alignSelf: 'center'
  },
  usernameTag: {
    paddingLeft: theme.sizes.padding,
    ...marginVerticalBase
  },
  textInput: {
    color: theme.colors.white,
    width: widthPercentageToDP('80%'),
    alignSelf: 'center',
    borderColor: theme.colors.white,
    borderWidth: scale(1),
    borderRadius: theme.sizes.border,
    textAlign: 'center'
  },
  error: {
    color: theme.colors.secondary,
    alignSelf: 'center'
  },
  submitIndicator: {
    alignSelf: 'center'
  },
  submitButton: {
    alignSelf: 'center'
  }
})

export default styles
