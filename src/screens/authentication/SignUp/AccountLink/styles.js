import { StyleSheet } from 'react-native'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  accountText: {
    position: 'absolute',
    top: theme.sizes.margin * 2,
    right: theme.sizes.margin * 2
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
})

export default styles
