import { setItem } from '../index'
import { getCurrentTimestampInMiliseconds } from '../../mixins/date/getCurrentTimestampInMiliseconds'

export const setRequestOpenTimestamp = async (requestID) => {
  const key = `${requestID}-openTimestamp`

  await setItem(key, String(getCurrentTimestampInMiliseconds()))
}
