import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const marginVerticalBase = {
  marginVertical: theme.sizes.margin
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: scale(250),
    height: verticalScale(250),
    ...marginVerticalBase
  },
  text: {
    textAlign: 'center',
    ...marginVerticalBase
  }
})

export default styles
