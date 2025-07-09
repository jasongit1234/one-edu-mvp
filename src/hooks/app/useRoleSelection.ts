import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigation } from './useNavigation'

export const useRoleSelection = () => {
  const { user, loading: authLoading, setUserRole } = useAuth()
  const { navigateTo, isNavigating, navigationMessage } = useNavigation()
  const [isUpdating, setIsUpdating] = useState(false)
  const [updatingRole, setUpdatingRole] = useState<'parent' | 'child' | null>(null)

  // Auto-redirect based on authentication and role
  useEffect(() => {
    if (!authLoading && !user) {
      navigateTo('/auth', 'Redirecting to sign in...')
      return
    }

    if (!authLoading && user && user.role) {
      if (user.role === 'parent') {
        navigateTo('/parent-dashboard', 'Redirecting to your dashboard...')
      } else if (user.role === 'child') {
        navigateTo('/mentor-chat', 'Redirecting to your dashboard...')
      }
    }
  }, [authLoading, user, navigateTo])

  const selectRole = async (role: 'parent' | 'child') => {
    if (!user || isUpdating) {
      return
    }

    setIsUpdating(true)
    setUpdatingRole(role)
    
    try {
      const success = await setUserRole(role)
      
      if (success) {
        if (role === 'parent') {
          navigateTo('/parent-dashboard', 'Setting up your dashboard...')
        } else {
          navigateTo('/child-onboarding', 'Setting up your profile...')
        }
      }
    } catch (error) {
      console.error('❌ RoleSelection: Error setting role:', error)
    } finally {
      setIsUpdating(false)
      setUpdatingRole(null)
    }
  }

  return {
    user,
    loading: authLoading,
    isUpdating,
    updatingRole,
    isNavigating,
    navigationMessage,
    selectRole
  }
} 