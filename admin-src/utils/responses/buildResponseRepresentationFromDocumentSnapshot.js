export const buildResponseRepresentationFromDocumentSnapshot = async (response) => {
  const responseData = response.data()

  const responseRepresentation = {
    id: response.id,
    ...responseData
  }

  return responseRepresentation
}
