import { useEffect, useRef, useCallback } from 'react'

export const useTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const setTimeoutWithCleanup = useCallback((callback: () => void, delay: number) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(callback, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    setTimeoutWithCleanup,
    clearCurrentTimeout
  }
} 