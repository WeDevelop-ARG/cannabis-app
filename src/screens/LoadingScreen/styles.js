import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '~/constants'

const baseMarginVertical = {
  marginVertical: theme.sizes.margin / 3
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DrCannabisIcon: {
    width: scale(175),
    height: verticalScale(175),
    ...baseMarginVertical
  },
  DrCannabisText: {
    fontSize: scale(30),
    ...baseMarginVertical
  }

})

export default styles
