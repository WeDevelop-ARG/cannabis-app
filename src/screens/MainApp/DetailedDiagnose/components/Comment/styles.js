import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  by: {
    marginBottom: verticalScale(8)
  },
  commentContainer: {
    width: theme.sizes.containerWidth,
    alignSelf: 'center',
    marginBottom: verticalScale(24)
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default styles
