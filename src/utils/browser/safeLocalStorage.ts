export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key)
      }
      return null
    } catch (error) {
      console.warn('LocalStorage is not accessible:', error)
      return null
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value)
      }
    } catch (error) {
      console.warn('LocalStorage is not accessible:', error)
    }
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn('LocalStorage is not accessible:', error)
    }
  },

  clear(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear()
      }
    } catch (error) {
      console.warn('LocalStorage is not accessible:', error)
    }
  },

  key(index: number): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.key(index)
      }
      return null
    } catch (error) {
      console.warn('LocalStorage is not accessible:', error)
      return null
    }
  },

  get length(): number {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.length
      }
      return 0
    } catch (error) {
      console.warn('LocalStorage is not accessible:', error)
      return 0
    }
  },
}
