import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: widthPercentageToDP(30)
  },
  image: {
    width: scale(150),
    height: scale(150)
  }
})

export default styles
