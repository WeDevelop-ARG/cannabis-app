import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const App = () => {
  return (
    <View>
      <Text style={styles.redText}>
        App
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  redText: {
    color: 'red'
  }
})

export default App
