import React, { useState, useEffect } from 'react'
import { DiagnoseResponseForm } from '../DiagnoseResponseForm'
import { DiagnoseInfo } from '../DiagnoseInfo'
import { getDownloadURLFromImages } from '../services/storage/getDownloadURLFromImages'
import { writeNewResponse } from '../services/database/writeNewResponse'
import DiagnoseImages from '../DiagnoseImages'
import ResponsesChat from '../ResponsesChat'
import { withLoadingIndicator } from '../HOC/withLoadingIndicator'
import classes from './styles.scss'

const DiagnosePanel = ({ diagnose }) => {
  const [images, setImages] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    setIsSubmitting(true)

    try {
      await writeNewResponse(values.answer, values.answeredBy, diagnose.userUID, diagnose.id)
    } catch (error) {
      alert('Unexpected problem when writing a new response, try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const images = await getDownloadURLFromImages(diagnose.imageReferences)

      setImages(images)
    }

    fetchData()
  }, [diagnose])

  const DiagnoseImagesWithIndicator = withLoadingIndicator(DiagnoseImages)

  return (
    <div className={classes.requestContainer}>
      <DiagnoseInfo diagnose={diagnose} />
      <ResponsesChat diagnose={diagnose} />
      <DiagnoseResponseForm
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <DiagnoseImagesWithIndicator
        images={images}
        loading={!images}
        loadingClassName={classes.loadingIndicator}
      />
    </div>
  )
}

export default DiagnosePanel
