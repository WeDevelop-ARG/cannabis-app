import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const ICON_SIZE = scale(16)

const styles = StyleSheet.create({
  button: {
    height: ICON_SIZE * 2,
    paddingVertical: theme.sizes.padding,
    borderRadius: ICON_SIZE,
    margin: theme.sizes.margin,
    backgroundColor: '#dd4b39' // specific google color
  },
  icon: {
    alignSelf: 'center',
    paddingHorizontal: theme.sizes.padding
  },
  text: {
    padding: theme.sizes.padding
  }
})

export default styles
