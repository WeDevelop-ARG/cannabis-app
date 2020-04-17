import React from 'react'
import classnames from 'classnames'
import DiagnoseImages from '../DiagnoseImages'
import classes from './styles.scss'

const Response = ({ text, date, isAdmin = false, images }) => {
  const messageClassname = classnames(classes.response, {
    [classes.adminResponse]: isAdmin,
    [classes.userResponse]: !isAdmin
  })

  return (
    <div className={messageClassname}>
      <div className={classes.text}>
        {text}
        <DiagnoseImages images={images} imageClassname={classes.image} />
      </div>
      <div className={classes.date}>
        {date}
      </div>
    </div>
  )
}

export default Response
