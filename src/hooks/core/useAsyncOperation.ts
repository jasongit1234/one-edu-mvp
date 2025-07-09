import { useState, useCallback } from 'react'

interface UseAsyncOperationOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const useAsyncOperation = (options: UseAsyncOperationOptions = {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const execute = useCallback(async (operation: () => Promise<void>) => {
    setLoading(true)
    setError('')

    try {
      await operation()
      options.onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      options.onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [options])

  const reset = useCallback(() => {
    setLoading(false)
    setError('')
  }, [])

  return {
    loading,
    error,
    setError,
    execute,
    reset
  }
} 