import React from 'react'
import classnames from 'classnames'
import classes from './styles.scss'

const Response = ({ text, date, isAdmin = false }) => {
  const messageClassname = classnames(classes.response, {
    [classes.adminResponse]: isAdmin,
    [classes.userResponse]: !isAdmin
  })

  return (
    <div className={messageClassname}>
      <div className={classes.text}>
        {text}
      </div>
      <div className={classes.date}>
        {date}
      </div>
    </div>
  )
}

export default Response
