import React from 'react'

export const DiagnoseInfo = ({ diagnose }) => (
  <div>
    <div>
      DIAGNOSE UUID: {diagnose.id}
    </div>
    <div>
      USERNAME: {diagnose.username}
    </div>
    <div>
      TEXT: {diagnose.text}
    </div>
    {diagnose.imagesSources && diagnose.imagesSources.map((imageSource, index) => (
      <img key={index} className='diagnose-image' src={imageSource} />
    ))}
  </div>
)
