import { isRequestSolved } from './isRequestSolved'

export const isRequestInDiscussion = (request) => {
  if (isRequestSolved(request)) return false
  else if (request.amountOfAnswers) return true
  else return false
}
