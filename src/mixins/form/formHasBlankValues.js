import { isEmpty, values } from 'lodash'

export const formHasBlankValues = (formValues) => {
  const blankValues = values(formValues).filter(element => element === '')

  return !isEmpty(blankValues)
}
