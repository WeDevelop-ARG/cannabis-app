import { StyleSheet } from 'react-native'
import { theme } from '~/constants'

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: theme.colors.gray3
  },
  indicatorStyle: {
    height: 0
  }
})

export default styles
