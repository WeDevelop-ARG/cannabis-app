import React from 'react'
import { View, TouchableOpacity } from 'react-native'

const SocialNetworkButton = ({ style, onPress, children }) => (
  <TouchableOpacity
    style={style}
    onPress={onPress}
  >
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      {children}
    </View>
  </TouchableOpacity>
)

export default SocialNetworkButton
