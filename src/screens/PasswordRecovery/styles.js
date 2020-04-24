import { StyleSheet } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters/extend'

export const ICON_WIDTH = scale(64)
export const ICON_HEIGHT = verticalScale(64)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    marginTop: verticalScale(143)
  },
  title: {
    marginTop: verticalScale(24),
    textAlign: 'center',
    fontSize: scale(24)
  },
  text: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(38),
    textAlign: 'center'
  }
})

export default styles
