import { StyleSheet } from 'react-native'
import { theme } from '~/constants'
import { moderateScale, verticalScale} from 'react-native-size-matters'

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
    marginBottom: verticalScale(20)
  },
  subtitle: {
    marginTop: theme.sizes.margin
  },
  description: {
    textAlign: 'center',
    marginBottom: theme.sizes.margin
  },
  button: {
    padding: moderateScale(20),
    borderRadius: 2
  }
})

export default styles
