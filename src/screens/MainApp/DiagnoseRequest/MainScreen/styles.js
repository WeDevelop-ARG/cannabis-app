import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { moderateScale } from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    padding: theme.sizes.padding,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    margin: theme.sizes.margin,
    width: moderateScale(150),
    height: moderateScale(150),
    backgroundColor: theme.colors.gray,
    borderRadius: moderateScale(10)
  },
  title: {
    ...theme.fonts.h1,
    marginBottom: theme.sizes.margin * 2
  },
  subtitle: {
    ...theme.fonts.h2,
    marginTop: theme.sizes.margin
  },
  description: {
    ...theme.fonts.description,
    textAlign: 'center',
    marginBottom: theme.sizes.margin
  },
  button: {
    padding: 20,
    borderRadius: 2
  }
})

export default styles
