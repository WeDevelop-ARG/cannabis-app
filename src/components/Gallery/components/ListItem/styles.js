import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const SCREEN_WIDTH = scale(327)

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: scale(24),
    width: scale(28),
    marginBottom: scale(1),
    marginRight: scale(3),
    alignContent: 'center',
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: scale(4)
  },
  badgeText: {
    fontFamily: 'raleway-bold',
    textAlign: 'center'
  },
  imageButton: {
    padding: scale(4),
    margin: scale(4),
    backgroundColor: theme.colors.primary,
    borderRadius: scale(6),
    overflow: 'hidden'
  },
  image: {
    borderRadius: scale(4),
    width: '100%',
    height: '100%'
  },
  noPadding: {
    padding: 0
  }
})

export default styles
