import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface UseProfileOptions {
  redirectOnMissing?: string
  requireChildProfile?: boolean
}

export const useProfile = (options: UseProfileOptions = {}) => {
  const { user, childProfile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const checkProfile = () => {
      if (!user) {
        setLoading(false)
        return
      }

      if (options.requireChildProfile) {
        if (childProfile) {
          setIsEditing(true)
          setLoading(false)
        } else {
          setIsEditing(false)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    checkProfile()
  }, [user, childProfile, options.requireChildProfile])

  return {
    user,
    childProfile,
    loading,
    isEditing,
    hasChildProfile: !!childProfile
  }
} 