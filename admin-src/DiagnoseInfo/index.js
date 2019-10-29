import React from 'react'

export const DiagnoseInfo = ({ diagnose }) => (
  <div>
    <div>
      DIAGNOSE UUID: {diagnose.id}
    </div>
    <div>
      USER UUID: {diagnose.user}
    </div>
    <div>
      TEXT: {diagnose.text}
    </div>
    {diagnose.imagesSources && diagnose.imagesSources.map((imageSource, index) => (
      <img key={index} className='diagnose-image' src={imageSource} />
    ))}
  </div>
)
