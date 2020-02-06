# APK/AAB Generation for PROD

## The process is the same: [APK/AAB generation for dev](./apk-generation-for-dev.md)

## Special configuration

As we add new features we increment the number of special configurations in firebase console, so although the process is the same for the APK/AAB generation, you have to manually set up these things. Those include:

- Firestore: Copy-paste rules from development. Create composite indexes if necessary.
- Redeploy [Hosting and Functions](./firebase-deployment.md)
- Storage: Copy-paste rules from development.
- Authentication: enable necessary methods (this **may** include some new keys, SHA's, and so on)
