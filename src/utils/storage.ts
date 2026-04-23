import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const setItem = (key: string, value: unknown) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.log('Storage set error:', error);
  }
};

export const getItem = <T = any>(key: string): T | null => {
  try {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Storage get error:', error);
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    storage.delete(key);
  } catch (error) {
    console.log('Storage remove error:', error);
  }
};
