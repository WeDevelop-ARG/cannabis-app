const admin = require('firebase-admin')

require('dotenv').config()

const initFirebaseAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(process.env.SERVICE_ACCOUNT_PATH),
    databaseUrl: process.env.DATABASE_URL
  })
}

module.exports.initFirebaseAdmin = initFirebaseAdmin
