import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, APP_ID } from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  appId: APP_ID
}

export default firebaseConfig
