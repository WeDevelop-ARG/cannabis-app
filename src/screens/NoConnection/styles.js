import { StyleSheet } from 'react-native'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    margin: theme.sizes.margin * 2
  }
})

export default styles
