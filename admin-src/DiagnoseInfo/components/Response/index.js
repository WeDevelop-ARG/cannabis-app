import React from 'react'
import './styles.css'

const Response = ({ text, date, isAdmin = false }) => {
  let messageClassname = 'response'

  if (isAdmin) {
    messageClassname += ' adminResponse'
  } else {
    messageClassname += ' userResponse'
  }

  return (
    <div className={messageClassname}>
      <div className='text'>
        {text}
      </div>
      <div className='date'>
        {date}
      </div>
    </div>
  )
}

export default Response
