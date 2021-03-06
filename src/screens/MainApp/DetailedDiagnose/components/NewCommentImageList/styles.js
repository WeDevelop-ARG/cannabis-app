import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  flatListContainerStyle: {
    alignSelf: 'center',
    marginLeft: scale(16)
  },
  imageContainer: {
    marginBottom: verticalScale(16)
  }
})

export default styles
