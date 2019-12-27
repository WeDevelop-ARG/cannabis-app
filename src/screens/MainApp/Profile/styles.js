import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    padding: moderateScale(10)
  },
  userContainer: {
    padding: moderateScale(20),
    borderBottomWidth: moderateScale(2),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(30)
  },
  leftContainer: {
    flex: 1
  },
  list: {
    padding: moderateScale(10),
    paddingTop: 0
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: moderateScale(20)
  },
  itemButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 0,
    margin: moderateScale(10)
  },
  itemImage: {
    backgroundColor: theme.colors.gray,
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: moderateScale(20)
  },
  itemText: {
    textAlign: 'left'
  }
})

export default styles
