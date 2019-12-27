import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CTA: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(5)
  }
})

export default styles
