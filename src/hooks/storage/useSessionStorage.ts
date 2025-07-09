import { useState, useCallback } from 'react'

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return {
    value: storedValue,
    setValue,
    removeValue
  }
}

// Specialized hook for managing multiple session storage keys with a prefix
export const useSessionStorageKeys = (prefix: string) => {
  const clearAllWithPrefix = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error(`Error clearing sessionStorage keys with prefix "${prefix}":`, error)
    }
  }, [prefix])

  const getAllWithPrefix = useCallback(() => {
    if (typeof window === 'undefined') return {}

    try {
      const keys = Object.keys(sessionStorage)
      const result: Record<string, unknown> = {}
      
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          const item = sessionStorage.getItem(key)
          if (item) {
            result[key] = JSON.parse(item)
          }
        }
      })
      
      return result
    } catch (error) {
      console.error(`Error getting sessionStorage keys with prefix "${prefix}":`, error)
      return {}
    }
  }, [prefix])

  return {
    clearAllWithPrefix,
    getAllWithPrefix
  }
} 