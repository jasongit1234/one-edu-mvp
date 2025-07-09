import { useEffect, useCallback, useState } from 'react'

export const useWindowEvent = <K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener(event, handler, options)

    return () => {
      window.removeEventListener(event, handler, options)
    }
  }, [event, handler, options])
}

// Specialized hook for resize events
export const useWindowResize = (handler: (event: UIEvent) => void) => {
  useWindowEvent('resize', handler)
}

// Specialized hook for keyboard events
export const useWindowKeydown = (handler: (event: KeyboardEvent) => void) => {
  useWindowEvent('keydown', handler)
}

// Hook for detecting window dimensions
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  const handleResize = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  useWindowResize(handleResize)

  return dimensions
} 