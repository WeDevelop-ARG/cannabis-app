import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.sizes.containerWidth,
    height: scale(45),
    backgroundColor: 'rgba(47, 141, 252, 0.08)',
    borderRadius: scale(6),
    marginBottom: verticalScale(22)
  },
  text: {
    marginStart: scale(13)
  }
})

export default styles
