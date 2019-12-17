const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

if (process.argv.length !== 3) {
  console.error('Invalid number of params')
  console.log('Usage: node setUserAsAdmin.js <email>')
  process.exit(1)
}

const mail = process.argv[2]

initFirebaseAdmin()

const setUserAsAdmin = async (user) => {
  try {
    await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true })
    console.log('User added as admin succesfully')
  } catch (error) {
    console.error('Could not add user as admin')
    console.error(error.message)
  }
  process.exit(0)
}

admin.auth().getUserByEmail(mail)
  .then(setUserAsAdmin)
  .catch(console.error.bind(console))
