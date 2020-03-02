import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { firebaseTimestampToMoment } from '../utils/date'
import { buildRequestRepresentationFromDocumentSnapshot } from '../utils/diagnose/buildRequestRepresentationFromDocumentSnapshot'
import classes from './styles.scss'

const DiagnoseList = ({ query, match }) => {
  const [diagnoses, setDiagnoses] = useState([])

  const onSnapshot = async (querySnapshot, filter) => {
    let newDiagnoses = diagnoses

    await Promise.all(
      querySnapshot.docChanges().map(async docChange => {
        const doc = docChange.doc
        const changeType = docChange.type

        if (changeType === 'added') {
          if (!newDiagnoses.find(diagnose => diagnose.id === doc.id)) {
            newDiagnoses.push(await buildRequestRepresentationFromDocumentSnapshot(doc))
          }
        }

        if (changeType === 'removed') {
          newDiagnoses = newDiagnoses.filter(diagnose => diagnose.id !== doc.id)
        }
      })
    )

    if (filter) {
      newDiagnoses = newDiagnoses.filter(filter)
    }

    setDiagnoses([...newDiagnoses])
  }

  useEffect(() => {
    const attachQueryListener = () => {
      return query(onSnapshot)
    }

    return attachQueryListener()
  }, [])

  return (
    <div className={classes.row}>
      <ListGroup className={classes.column}>
        {diagnoses && diagnoses.map((diagnose, index) => (
          <Link key={index} to={`${match.url}/${diagnose.userUID}/${diagnose.id}`}>
            <ListGroup.Item>
              {diagnose.id}{' '} - {diagnose.username} ({firebaseTimestampToMoment(diagnose.createdAt).format('LL')})
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  )
}

export default withRouter(DiagnoseList)
