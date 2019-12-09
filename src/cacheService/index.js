import { AsyncStorage } from 'react-native'
import CacheError from '~/AppErrors/CacheError'

export const reset = () => {
  AsyncStorage.clear()
}

export const setItem = async (itemKey, itemValue) => {
  try {
    await AsyncStorage.setItem(itemKey, itemValue)
  } catch (error) {
    throw new CacheError(error.message)
  }
}

export const getItem = async (itemKey) => {
  try {
    const itemValue = await AsyncStorage.getItem(itemKey)
    if (itemValue) {
      return itemValue
    }
  } catch (error) {
    throw new CacheError(error.message)
  }
  return null
}

export const removeItem = async (itemKey) => {
  try {
    const item = await AsyncStorage.removeItem(itemKey)
  } catch (error) {
    throw new CacheError(error.message)
  }
}
