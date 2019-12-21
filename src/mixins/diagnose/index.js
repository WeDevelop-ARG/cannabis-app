export const sortDiagnosesByMostRecentCreation = (diagnoses) => (
  diagnoses.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
)

export const sortDiagnosesByMostRecentUpdate = (diagnoses) => (
  diagnoses.sort((a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis())
)
