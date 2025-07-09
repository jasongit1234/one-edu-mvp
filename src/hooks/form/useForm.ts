import { useState, useCallback, useEffect } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => string | null
  onSubmit: (values: T) => Promise<void>
  syncData?: T | null | undefined
  syncMap?: Partial<Record<keyof T, (value: unknown) => unknown>>
}

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  syncData,
  syncMap = {}
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const setValue = useCallback((key: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }, [])

  const setAllValues = useCallback((newValues: T) => {
    setValues(newValues)
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setError('')
    setLoading(false)
  }, [initialValues])

  // Sync external data with form values
  useEffect(() => {
    if (syncData) {
      Object.keys(syncData).forEach((key) => {
        const typedKey = key as keyof T
        const rawValue = syncData[typedKey]
        
        // Apply transformation if provided in syncMap
        const transformedValue = syncMap[typedKey] 
          ? syncMap[typedKey]!(rawValue)
          : rawValue
        
        setValue(typedKey, transformedValue)
      })
    }
  }, [syncData, setValue, syncMap])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    setLoading(true)
    setError('')

    // Validate if validation function provided
    if (validate) {
      const validationError = validate(values)
      if (validationError) {
        setError(validationError)
        setLoading(false)
        return
      }
    }

    try {
      await onSubmit(values)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [values, validate, onSubmit])

  return {
    values,
    loading,
    error,
    setError,
    setValue,
    setAllValues,
    reset,
    handleSubmit
  }
} 