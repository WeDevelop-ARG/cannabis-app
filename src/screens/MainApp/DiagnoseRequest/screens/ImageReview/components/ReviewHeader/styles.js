import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50)
  },
  imageButtonsContainer: {
    flexDirection: 'row'
  },
  changeButton: {
    marginRight: scale(40)
  },
  deleteButton: {
    marginRight: scale(22)
  }
})

export default styles
