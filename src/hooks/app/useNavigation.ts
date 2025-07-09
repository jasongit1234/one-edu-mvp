import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useNavigation = () => {
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationMessage, setNavigationMessage] = useState('')
  const router = useRouter()

  const navigateTo = (path: string, message: string = 'Navigating...') => {
    setIsNavigating(true)
    setNavigationMessage(message)
    
    // Use window.location for immediate navigation or router.push for smoother transition
    if (path.startsWith('http') || path.includes('auth')) {
      window.location.href = path
    } else {
      router.push(path)
    }
  }

  const navigateWithDelay = (path: string, delay: number = 100, message: string = 'Navigating...') => {
    setIsNavigating(true)
    setNavigationMessage(message)
    
    setTimeout(() => {
      router.push(path)
    }, delay)
  }

  return {
    isNavigating,
    navigationMessage,
    navigateTo,
    navigateWithDelay,
    router
  }
} 