import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemSS = async () => {
  try {
    const jsonValue = await SecureStore.getItemAsync('token')
    return jsonValue != null ? jsonValue : null;
  } catch(e) {
    return null;
  }
}

export const removeItemSS = async (key)=> SecureStore.deleteItemAsync(key);

export async function setItemSS(key, item) {
  await SecureStore.setItemAsync(key, item);
}

export const setItemAS = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        return null;
    }
  }

  export const getItemAS = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return null;
    }
  }
  
  export const removeItemAS = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
        return null;
    }
  }

