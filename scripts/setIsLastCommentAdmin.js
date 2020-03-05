const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

initFirebaseAdmin()

const setIsLastCommentAdmin = async () => {
  try {
    const requests = admin.firestore().collectionGroup('requests')

    const snapshots = await requests.get()

    await Promise.all(
      snapshots.docs.map(async (doc) => {
        const responses = await admin
          .firestore()
          .collection(`users/${doc.ref.parent.parent.id}/requests/${doc.id}/responses`)
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get()

        console.log(`Setting "isLastCommentAdmin: ${responses.docs[0].data().hasOwnProperty('answeredBy')}" in request ${doc.id}`)

        await doc.ref.update({
          isLastCommentAdmin: responses.docs[0].data().hasOwnProperty('answeredBy')
        })
      })
    )
  } catch (error) {
    console.log(error.message)
  }
}

setIsLastCommentAdmin()
