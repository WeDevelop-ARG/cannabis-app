# Get a keystore (this process should be executed only once)

1. To get a first keystore you have to have the `keytool` utility

2. Run the following command. You have to supply `my-upload-key` and an `alias`: 

    `keytool -genkeypair -v -keystore <my-upload-key>.keystore -alias <alias> -keyalg RSA -keysize 2048 -validity 10000
    `
  
3. Fill information regarding organization, names, cities. **You also have to input a `keystore password` and a `key password`**

4. `.keystore` should be generated
