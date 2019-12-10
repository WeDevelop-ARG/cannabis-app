import { StyleSheet } from 'react-native'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  noAccountText: {
    position: 'absolute',
    bottom: theme.sizes.margin
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
})

export default styles
