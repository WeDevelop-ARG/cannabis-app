import { StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { theme } from '~/constants'

export const ICON_SIZE_WIDTH = moderateScale(35, 1)
export const ICON_SIZE_HEIGHT = moderateScale(35, 1)

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(6, 1),
    borderRadius: ICON_SIZE_HEIGHT,
    margin: theme.sizes.margin,
    backgroundColor: theme.colors.white,
    ...theme.shadows
  }
})

export default styles
