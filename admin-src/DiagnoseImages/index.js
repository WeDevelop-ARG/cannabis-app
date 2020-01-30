import React from 'react'
import classes from './styles.css'

const DiagnoseImages = ({ imagesSources }) => (
  imagesSources && imagesSources.map((imageSource, index) => (
    <img key={index} className={classes.diagnoseImage} src={imageSource} />
  ))
)

export default DiagnoseImages
