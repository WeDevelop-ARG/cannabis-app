# .env setup

```
API_KEY=xxx  
AUTH_DOMAIN=xxx  
DATABASE_URL=xxx  
PROJECT_ID=xxx  
STORAGE_BUCKET=xxx  
APP_ID=xxx  
PRIVACY_POLICY_URL=xxx  
WEB_CLIENT_ID=xxx  
SIZE_MATTERS_BASE_WIDTH=375  
SIZE_MATTERS_BASE_HEIGHT=670
SERVICE_ACCOUNT_PATH=`serviceAccount-adminsdk.json` 
```

# Where to get each thing

## API_KEY
 - Extract from [google-services.json](./google-services.md)
 
    ![apiKey](../assets/images/apiKey.jpg)

## AUTH_DOMAIN

### Go to:
  - Authentication
    - Sign In Methods

         ![auth](../assets/images/auth.jpg)

      - Scroll down to authorized domains. 
      - Copy the `firebaseapp` one

      ![auth](../assets/images/authDomain.jpg)

## DATABASE_URL, PROJECT_ID, STORAGE_BUCKET

 - Extract from [google-services.json](./google-services.md) (firebase_url, project_id, storage_bucket)
 
   ![project info](../assets/images/projectInfo.jpg)

## APP_ID 

 - Extract from [google-services.json](./google-services.md) (mobilesdk_app_id)

   ![app_id](../assets/images/appId.jpg)

## PRIVACY_POLICY_URL

### Go to:

- firebase console
  - hosting
  - It's the URL for the privacy policy. 

## WEB_CLIENT_ID

- You have to have Google Sign In Method enabled in firebase authentication
 - Click on Google Sign In and extract Web client ID

   ![webClientId](../assets/images/webClientId.jpg)

## SIZE_MATTERS_BASE_WIDTH=375
## SIZE_MATTERS_BASE_HEIGHT=670

## SERVICE_ACCOUNT_PATH

1. Download service account json file from firebase console

  -  Go to 
      - project overview
        - project settings

     ![project settings](../assets/images/projectOverview.jpg)

  - Tap service accounts
     ![service account](../assets/images/serviceAccount.jpg)

  - Generate a new key

     ![generate a new key](../assets/images/generateServiceAccountKey.jpg)
