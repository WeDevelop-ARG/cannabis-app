import React from 'react'
import { Text, View } from 'react-native'
import * as AnalyticsService from '~/analyticsService'

const Settings = () => {
  AnalyticsService.setCurrentScreenName('Settings')
  return (
    <View>
      <Text>
      Settings
      </Text>
    </View>
  )
}

export default Settings
