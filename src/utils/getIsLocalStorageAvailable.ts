export function getIsLocalStorageAvailable() {
  try {
    const testKey = 'test'
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}
