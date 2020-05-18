import { useEffect, useState } from 'react'

const buildDiagnose = (doc) => {
  const diagnose = doc.data({ serverTimestamps: 'estimate' })

  diagnose.id = doc.id
  diagnose.thumbnail = diagnose.imageReferences[0]

  return diagnose
}

const processAddedDiagnose = (diagnoses, doc) => {
  const _diagnoses = [...diagnoses]
  const builtDiagnose = buildDiagnose(doc)

  _diagnoses.unshift({ builtDiagnose, id: doc.id })

  return _diagnoses
}

const processModifiedDiagnose = (diagnoses, doc) => {
  const _diagnoses = [...diagnoses]
  const builtDiagnose = buildDiagnose(doc)
  const index = _diagnoses.findIndex(diagnose => diagnose.id === doc.id)

  _diagnoses[index] = { builtDiagnose, id: doc.id }

  return _diagnoses
}

const processRemovedDiagnose = (diagnoses, doc) => {
  return diagnoses.filter((diagnose) => diagnose.id !== doc.id)
}

function useQueryListener ({ fetch, defaultLoadingStatus = true, defaultResults = [] }) {
  const [loading, setLoading] = useState(defaultLoadingStatus)
  const [results, setResults] = useState(defaultResults)

  useEffect(() => {
    const unsuscribe = fetch(async (snapshot) => {
      setLoading(true)
      snapshot.docChanges().map(docChange => {
        const doc = docChange.doc
        const changeType = docChange.type

        switch (changeType) {
          case 'added': setResults(v => processAddedDiagnose(v, doc)); break
          case 'modified': setResults(v => processModifiedDiagnose(v, doc)); break
          case 'removed': setResults(v => processRemovedDiagnose(v, doc)); break
        }
      })
      setLoading(false)
    })

    return () => { unsuscribe() }
  }, [])

  return { loading, results }
}

export default useQueryListener
