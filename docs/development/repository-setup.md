# Repository setup

1. `git clone git@github.com:WeDevelop-ARG/cannabis-app.git`
2. `npm install`   **(This may take a while)**
3. Place the  [keystore](../file-source/keystore.md) in `android/app` 
4. Place [google-services.json](../file-source/google-services.md) in `android/app`
5. Place the [.env](../file-source/environment-variables.md)  file in the project root
6. Set the appropriate keystore name, password and upload key in `android/gradle.properties`
    - MYAPP_UPLOAD_STORE_FILE=xxx.keystore
    - MYAPP_UPLOAD_KEY_ALIAS=xxx
    - MYAPP_UPLOAD_STORE_PASSWORD=xxx
    - MYAPP_UPLOAD_KEY_PASSWORD=xxx
7. `npm start` to open metro server.
8. `react-native run-android` to run app on a virtual o physical device.
