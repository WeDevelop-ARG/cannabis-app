import { PermissionsAndroid } from 'react-native'

export const requestPermissions = async (permission) => {
  return PermissionsAndroid.request(permission)
}

export const requestReadPermissions = async () => {
  return requestPermissions(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
}

export const requestWritePermissions = async () => {
  return requestPermissions(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
}
