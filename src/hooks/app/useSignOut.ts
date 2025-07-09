import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export const useSignOut = () => {
  const [signingOut, setSigningOut] = useState(false)
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      await signOut()
      window.location.href = '/auth'
    } catch (error) {
      console.error('Error signing out:', error)
      setSigningOut(false)
    }
  }

  return {
    signingOut,
    handleSignOut
  }
} 