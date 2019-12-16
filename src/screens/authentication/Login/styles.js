import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const marginVerticalBase = {
  marginVertical: theme.sizes.margin
}

const AuthButtonStyle = {
  width: widthPercentageToDP('80%'),
  alignSelf: 'center',
  ...marginVerticalBase
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
  welcomeMessage: {
    width: widthPercentageToDP('60%'),
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: scale(32),
    ...marginVerticalBase
  },
  googleButton: {
    ...AuthButtonStyle
  },
  optionDisclaimer: {
    textAlign: 'center',
    ...marginVerticalBase
  },
  emailButton: {
    ...AuthButtonStyle,
    borderWidth: 1,
    borderColor: theme.colors.white
  }
})

export default styles
