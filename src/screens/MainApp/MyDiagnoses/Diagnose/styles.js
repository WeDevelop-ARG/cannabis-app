import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { theme } from '~/constants'

const THUMBNAIL_SIZE = 100

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: widthPercentageToDP('90%'),
    padding: theme.sizes.padding,
    margin: theme.sizes.margin,
    borderWidth: scale(1),
    borderColor: theme.colors.gray
  },
  imageContainer: {
    marginRight: theme.sizes.margin
  },
  image: {
    width: scale(THUMBNAIL_SIZE),
    height: scale(THUMBNAIL_SIZE)
  },
  information: {
    flex: 1,
    justifyContent: 'space-between'
  },
  dates: {
    flexDirection: 'row',
    marginLeft: theme.sizes.margin / 3,
    marginBottom: theme.sizes.margin / 3
  },
  description: {
    flex: 2
  },
  answers: {
    marginTop: theme.sizes.margin / 3,
    marginLeft: theme.sizes.margin / 3
  }
})

export default styles
