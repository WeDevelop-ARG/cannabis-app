import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  image: {
    width: scale(50),
    height: scale(50),
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center'
  }
})

export default styles
