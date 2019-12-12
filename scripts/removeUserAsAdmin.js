const admin = require('firebase-admin')
const { initFirebaseAdmin } = require('./utils/initFirebaseAdmin.js')

if (process.argv.length !== 3) {
  console.error('Invalid number of params')
  console.log('Usage: node removeUserAsAdmin.js <email>')
  process.exit(1)
}

const mail = process.argv[2]

initFirebaseAdmin()

const setUserAsAdmin = async (user) => {
  try {
    await admin.auth().setCustomUserClaims(user.uid, { isAdmin: false })
    console.log('User admin privileges succesfully removed')
  } catch (error) {
    console.error('Could not remove admin privileges for user')
    console.error(error.message)
  }
  process.exit(0)
}

admin.auth().getUserByEmail(mail).then(
  user => setUserAsAdmin(user)
).catch(
  error => console.error(error.message)
)
