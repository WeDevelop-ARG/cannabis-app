import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingIndicator = (props) => {
  return (
    <div {...props}>
      <Spinner animation='border' />
    </div>
  )
}

export default LoadingIndicator
