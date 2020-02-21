import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const LOGO_HEIGHT = scale(200)
export const LOGO_WIDTH = scale(160)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: verticalScale(30),
    marginTop: verticalScale(8)
  },
  logo: {
    position: 'absolute',
    top: verticalScale(99)
  },
  title: {
    textAlign: 'center',
    marginHorizontal: theme.sizes.margin * 2,
    marginTop: verticalScale(310)
  },
  description: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(60),
    textAlign: 'center'
  },
  backButton: {
    width: scale(50)
  },
  button: {
    marginTop: verticalScale(80),
    width: scale(202)
  }
})

export default styles
