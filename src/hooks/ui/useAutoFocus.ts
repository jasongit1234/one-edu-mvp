import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/lib/openai'

interface UseAutoFocusProps {
  messages: ChatMessage[]
  isLoading: boolean
}

export const useAutoFocus = ({ messages, isLoading }: UseAutoFocusProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Focus when new message arrives and not loading
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isLoading])

  return inputRef
} 