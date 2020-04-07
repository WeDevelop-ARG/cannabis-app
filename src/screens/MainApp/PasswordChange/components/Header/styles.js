import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters/extend'
import { Header } from 'react-navigation-stack'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Header.HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.shadow,
    borderBottomWidth: moderateScale(2, 1)
  },
  backButton: {
    position: 'absolute',
    left: 0
  }
})

export default styles
