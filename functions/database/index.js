const admin = require('firebase-admin')

const getUserByUID = async (user, collectionPath = 'users') => {
  try {
    const querySnapshot = await admin
      .firestore()
      .collection(collectionPath)
      .doc(user)
      .get()
    return querySnapshot.data()
  } catch (error) {
    console.log(error)
  }
  return null
}

module.exports.getUserByUID = getUserByUID
