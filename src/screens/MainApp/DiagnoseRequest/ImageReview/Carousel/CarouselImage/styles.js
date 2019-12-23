import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  carouselImageContainer: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP(40)
  },
  carouselImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0
  }
})

export default styles
