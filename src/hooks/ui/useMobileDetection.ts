import { useState, useEffect } from 'react'

interface UseMobileDetectionOptions {
  breakpoint?: number
}

export const useMobileDetection = ({ breakpoint = 640 }: UseMobileDetectionOptions = {}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    // Check on mount
    checkMobile()
    
    // Listen to window resize
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return {
    isMobile,
    isDesktop: !isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0
  }
} 