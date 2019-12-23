import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  imageContainer: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(15),
    margin: theme.sizes.margin
  },
  flatListImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0
  },
  selectedFlatListImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0,
    borderColor: theme.colors.secondary,
    borderWidth: scale(3)
  }
})

export default styles
