import { StyleSheet } from 'react-native'
import { heightPercentageToDP } from '~/styleMixins'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  downloadingIndicator: {
    margin: 5
  },
  noAnswersYetContainer: {
    flex: 1,
    alignItems: 'center',
    top: heightPercentageToDP('40%')
  }
})

export default styles
