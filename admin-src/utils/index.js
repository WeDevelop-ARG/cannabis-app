import * as firebase from 'firebase'

export const userHasAccess = async () => {
  try {
    const user = await firebase.auth().currentUser

    if (!user) return false

    const result = await user.getIdTokenResult()

    return result.claims.isAdmin
  } catch (error) {
    return false
  }
}
