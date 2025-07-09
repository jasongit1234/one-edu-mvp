import { useEffect } from 'react'

interface UseFormSyncOptions<T> {
  data: T | null | undefined
  setValue: (key: keyof T, value: unknown) => void
  syncMap?: Partial<Record<keyof T, (value: unknown) => unknown>>
}

export const useFormSync = <T extends Record<string, unknown>>({
  data,
  setValue,
  syncMap = {}
}: UseFormSyncOptions<T>) => {
  useEffect(() => {
    if (data) {
      (Object.keys(data) as Array<keyof T>).forEach((key) => {
        const rawValue = data[key]
        
        // Apply transformation if provided in syncMap
        const transformedValue = syncMap[key] 
          ? syncMap[key]!(rawValue)
          : rawValue
        
        setValue(key, transformedValue)
      })
    }
  }, [data, setValue, syncMap])
}

// Specialized hook for profile syncing
interface ProfileData {
  name?: string
  age?: number
  interests?: string
}

export const useProfileFormSync = <T extends Record<string, unknown>>(
  profile: ProfileData | null | undefined,
  setValue: (key: keyof T, value: unknown) => void
) => {
  useEffect(() => {
    if (profile) {
      setValue('name' as keyof T, profile.name || '')
      setValue('age' as keyof T, profile.age?.toString() || '')
      setValue('interests' as keyof T, profile.interests || '')
    }
  }, [profile, setValue])
} 