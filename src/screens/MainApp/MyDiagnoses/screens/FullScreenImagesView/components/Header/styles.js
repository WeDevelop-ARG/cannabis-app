import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const BACK_BUTTON_COLOR = theme.colors.white
const PADDING_TO_STATUS_BAR = verticalScale(16)

const styles = StyleSheet.create({
  usernameContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: scale(10)
  },
  backButton: {
    paddingTop: PADDING_TO_STATUS_BAR,
    position: 'absolute',
    zIndex: 2
  },
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: verticalScale(75),
    paddingTop: PADDING_TO_STATUS_BAR,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1
  }
})

export default styles
