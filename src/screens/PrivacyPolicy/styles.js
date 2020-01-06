import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.gray3
  },
  webview: {
    flex: 1,
    width: scale(375)
  },
  button: {
    margin: theme.sizes.margin * 2
  }
})

export default styles
