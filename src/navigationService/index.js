// this is just as it appears in the react navigation official docs https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
import React from 'react'
import { NavigationActions, NavigationEvents } from 'react-navigation'

let _navigator

function setTopLevelNavigator (navigatorRef) {
  _navigator = navigatorRef
}

function navigate (routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

// this is our functions

export const ForceRerenderOnNavigation = ({ resetStateFunction }) => (
  <NavigationEvents onWillFocus={resetStateFunction} />
)

export const ForceCleanUpOnScreenLeave = ({ cleanUpFunction }) => (
  <NavigationEvents onWillBlur={cleanUpFunction} />
)

export default {
  navigate,
  setTopLevelNavigator
}
