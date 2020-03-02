import React from 'react'
import LoadingIndicator from '../LoadingIndicator'

export const withLoadingIndicator = (Component) => {
  const LoadingComponent = ({ loading, loadingClassName, ...props }) => {
    if (loading) return <LoadingIndicator className={loadingClassName} />

    return (
      <Component {...props} />
    )
  }

  return LoadingComponent
}
