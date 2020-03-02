import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { queryRequestByIDs } from '../services/database/queryRequestByIDs'
import { buildRequestRepresentationFromDocumentSnapshot } from '../utils/diagnose/buildRequestRepresentationFromDocumentSnapshot'
import DiagnosePanel from '../DiagnosePanel'
import { withLoadingIndicator } from '../HOC/withLoadingIndicator'
import classes from './styles.scss'

const RoutedDiagnoseByURL = () => {
  const [request, setRequest] = useState(null)
  const { userID, requestID } = useParams()

  useEffect(() => {
    const buildRequest = async () => {
      try {
        const request = await queryRequestByIDs(userID, requestID)
        const requestData = await buildRequestRepresentationFromDocumentSnapshot(request)

        setRequest(requestData)
      } catch (error) {
        setRequest(null)
      }
    }

    buildRequest()
  }, [userID, requestID])

  const DiagnosePanelWithIndicator = withLoadingIndicator(DiagnosePanel)

  return (
    <DiagnosePanelWithIndicator
      diagnose={request}
      loading={!request}
      loadingClassName={classes.loadingIndicator}
    />
  )
}

export default RoutedDiagnoseByURL
