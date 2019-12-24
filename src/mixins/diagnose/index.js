const sortDescending = (array, getSortValue = a => a) => (
  array.sort((a, b) => getSortValue(b) - getSortValue(a))
)

export const sortDiagnosesByMostRecentCreation = (diagnoses) => (
  sortDescending(diagnoses, a => a.createdAt.toMillis())
)

export const sortDiagnosesByMostRecentUpdate = (diagnoses) => (
  sortDescending(diagnoses, a => a.updatedAt.toMillis())
)
