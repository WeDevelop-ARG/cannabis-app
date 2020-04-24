import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'

export const SCREEN_WIDTH = scale(327)

const styles = StyleSheet.create({
  listContainer: {
    padding: scale(12),
    paddingBottom: verticalScale(130),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  defaultMargin: {
    marginTop: verticalScale(26)
  }
})

export default styles
