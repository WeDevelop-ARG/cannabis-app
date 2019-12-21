import { StyleSheet } from 'react-native'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: theme.sizes.margin
  },
  headerTitleStyle: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default styles
