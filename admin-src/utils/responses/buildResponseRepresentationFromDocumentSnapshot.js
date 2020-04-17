import { getDownloadURLFromImages } from '../../services/storage/getDownloadURLFromImages'

export const buildResponseRepresentationFromDocumentSnapshot = async (response) => {
  const responseData = response.data()
  const images = await getDownloadURLFromImages(responseData.imageReferences)

  const responseRepresentation = {
    id: response.id,
    ...responseData,
    images
  }

  return responseRepresentation
}
