# Firebase deployment

## IMPORTANT: Update Firebase configuration comparing both **dev** and **production**
  -  ## Check hosting rules, firestore rules, and so on.

## From scratch

### Prequisite

1. **(one-time)** Make sure you have set as default the proper Firebase Project. This information will be written in **`.firebaserc`**

### Hosting

1. Set corresponding targets **(one time)**
    - `npx firebase target:apply hosting admin <SITE_AS_IT_APPEARS_IN_FIREBASE_CONSOLE>` 
    - `npx firebase target:apply hosting site <SITE_AS_IT_APPEARS_IN_FIREBASE_CONSOLE>` 
2.  Deploy target:
    - `npm run admin:deploy`
    - `npm run site:deploy` 

    **Note**: 
    - **site** is only for production

### Functions

1. `npm install` in the **`functions/`** folder.
2. `npm run functions:deploy`

#### Functions environmental configuration

**(one-time, except for new configs)** Run the following commands, with the appropriate keys from the **`KEYS.txt`** file:
   - `npx firebase functions:config:set fcm.api_key=<FCM_API_KEY>`
   - `npx firebase functions:config:set fcm.sender_id=<FCM_SENDER_ID>`
   - `npx firebase functions:config:set sendgrid.api_key=<SENDGRID_API_KEY>`
