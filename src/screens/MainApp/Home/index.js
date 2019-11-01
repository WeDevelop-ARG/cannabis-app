import React from 'react'
import DashBoard from './Dashboard'
import * as AnalyticsService from '~/analyticsService'


const Home = () => {
  AnalyticsService.setCurrentScreenName('Home')
  return (
    <DashBoard />
  )
}

export default Home
