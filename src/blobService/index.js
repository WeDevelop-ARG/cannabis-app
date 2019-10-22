import BlobError from '~/AppErrors/BlobError'

export const buildBlobFromURI = async (uri) => {
  try {
    const fetchURI = await fetch(uri)
    return fetchURI.blob()
  } catch (error) {
    throw new BlobError('Could not build Blob from URI.')
  }
}
