import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Stores an item in local storage.
 * @param {string} key - The key for the item.
 * @param {any} value - The value to store.
 * @returns {Promise<void>} A promise indicating the completion of the operation.
 */
export async function setItemInLocalStorage(key, value) {
  if (!key || value === undefined) {
    return;
  }
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}
/**
 * Retrieves an item from local storage.
 * @param {string} key - The key for the item.
 * @returns {Promise<any | null>} A promise with the retrieved value or null if the item does not exist.
 */
export async function getItemFromLocalStorage(key) {
  if (!key) {
    return;
  }
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}
/**
 * Deletes an item from local storage.
 * @param {string} key - The key for the item.
 * @returns {Promise<void>} A promise indicating the completion of the operation.
 */
export async function deleteItemFromLocalStorage(key) {
  if (!key) {
    return;
  }
  await AsyncStorage.removeItem(key);
}
