import { getItem } from '../index'

export const getRequestOpenTimestamp = async (requestID) => {
  const key = `${requestID}-openTimestamp`
  const cachedOpenTimestamp = await getItem(key)

  return Number(cachedOpenTimestamp)
}
