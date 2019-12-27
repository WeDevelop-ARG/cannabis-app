import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  informationContainer: {
    flex: 1,
    width: widthPercentageToDP('90%'),
    alignSelf: 'center'
  }
})

export default styles
