import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters/extend'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: theme.sizes.margin * 2
  },
  title: {
    marginTop: verticalScale(16)
  },
  userContainer: {
    marginTop: verticalScale(35),
    marginBottom: verticalScale(25),
    marginLeft: scale(5)
  },
  username: {
    marginBottom: verticalScale(5)
  },
  listItem: {
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(14),
    borderTopWidth: verticalScale(1),
    borderBottomWidth: verticalScale(1),
    borderColor: '#F0F0F0',
    marginTop: verticalScale(-1),
    padding: scale(1)
  },
  itemButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 0

  },
  itemImageContainer: {
    width: scale(26),
    alignItems: 'center',
    marginRight: scale(16)
  },
  itemText: {
    textAlign: 'left'
  }
})

export default styles
