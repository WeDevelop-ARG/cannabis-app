import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'column',
    backgroundColor: theme.colors.gray3
  },
  carouselContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center'
  },
  paginationDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: theme.colors.primary
  },
  inactivePaginationDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#D3D5D8'
  },
  button: {
    width: scale(202),
    height: verticalScale(45),
    position: 'absolute',
    top: verticalScale(511)
  }
})

export default styles
