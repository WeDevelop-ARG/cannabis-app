import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  button: {
    height: theme.sizes.base,
    paddingVertical: theme.sizes.padding,
    margin: theme.sizes.margin,
    backgroundColor: '#dd4b39' // specific google color
  },
  icon: {
    alignSelf: 'center',
    paddingHorizontal: theme.sizes.padding,
    borderRightColor: theme.colors.white,
    borderRightWidth: scale(1)
  },
  text: {
    padding: theme.sizes.padding
  }
})

export default styles
