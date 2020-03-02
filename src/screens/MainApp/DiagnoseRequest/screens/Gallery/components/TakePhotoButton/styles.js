import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  box: {
    margin: scale(4),
    borderRadius: scale(6),
    backgroundColor: theme.colors.primaryAlpha,
    borderColor: theme.colors.primary,
    borderWidth: scale(1),
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerBox: {
    alignItems: 'center',
    flex: 1
  }
})

export default styles
