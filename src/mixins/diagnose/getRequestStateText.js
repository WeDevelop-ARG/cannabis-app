import { isRequestSolved } from './isRequestSolved'
import { isRequestInDiscussion } from './isRequestInDiscussion'

export const getRequestStateText = (request) => {
  if (isRequestSolved(request)) return 'Resuelta'
  else if (isRequestInDiscussion(request)) return 'En discusión'
  else return 'Abierta'
}
