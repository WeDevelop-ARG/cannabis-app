import { StyleSheet } from 'react-native'
import { scale, moderateScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

export const ITEM_LENGTH = moderateScale(90)

const styles = StyleSheet.create({
  imageContainer: {
    width: ITEM_LENGTH,
    height: ITEM_LENGTH,
    marginRight: scale(10)
  },
  flatListImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0,
    borderRadius: theme.sizes.border
  },
  selectedFlatListImage: {
    flex: 1,
    resizeMode: 'cover',
    margin: 0,
    borderColor: theme.colors.primary,
    borderRadius: theme.sizes.border,
    borderWidth: scale(3)
  }
})

export default styles
