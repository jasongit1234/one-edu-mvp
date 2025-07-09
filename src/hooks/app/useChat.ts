import { useState, useEffect, useCallback } from 'react'
import { ChatMessage } from '@/lib/openai'

interface XPNotification {
  show: boolean
  xpEarned: number
  leveledUp: boolean
  newLevel: number
  newBadges: unknown[]
}

interface UseChatOptions {
  childProfile?: {
    id?: string
    name?: string
    age?: number
    interests?: string
  } | null
}

export const useChat = ({ childProfile }: UseChatOptions) => {
  console.log('🔄 useChat Hook Re-render', { childProfile })
  
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Debug messages array changes
  useEffect(() => {
    console.log('📨 Messages Updated:', { messages, count: messages.length })
  }, [messages])

  // Debug input changes
  useEffect(() => {
    console.log('✍️ Input Changed:', { inputMessage })
  }, [inputMessage])
  const [xpNotification, setXpNotification] = useState<XPNotification>({
    show: false,
    xpEarned: 0,
    leveledUp: false,
    newLevel: 0,
    newBadges: []
  })

  // Initialize with Astra's welcome message - temporarily disabled for debugging
  // useEffect(() => {
  //   if (messages.length === 0 && childProfile) {
  //     const welcomeMessage: ChatMessage = {
  //       role: 'assistant',
  //       content: `Hi ${childProfile.name}! I'm so excited to chat with you and help you learn amazing things!`,
  //       timestamp: new Date()
  //     }
  //     setMessages([welcomeMessage])
  //   }
  // }, [messages.length, childProfile])

  const sendMessage = useCallback(async () => {
    console.log('🚀 Sending Message:', { inputMessage, isLoading })
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          childName: childProfile?.name || 'Young Learner',
          childAge: childProfile?.age || 10,
          childInterests: childProfile?.interests || 'learning and exploring',
          childId: childProfile?.id || 'mock-child-123',
        }),
      })

      const data = await response.json()

      const astraMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, astraMessage])

      // Handle XP notification
      if (data.xp) {
        setXpNotification({
          show: true,
          xpEarned: data.xp.xpEarned,
          leveledUp: data.xp.leveledUp,
          newLevel: data.xp.newLevel,
          newBadges: data.xp.newBadges || []
        })

        // Auto-hide notification after 5 seconds
        setTimeout(() => {
          setXpNotification(prev => ({ ...prev, show: false }))
        }, 5000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Oops! I had a little hiccup there. Can you try sending your message again? 😅',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [inputMessage, isLoading, messages, childProfile])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  const addToInput = useCallback((text: string) => {
    setInputMessage(prev => prev + text)
  }, [])

  const clearInput = useCallback(() => {
    setInputMessage('')
  }, [])

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    xpNotification,
    sendMessage,
    handleKeyPress,
    addToInput,
    clearInput
  }
} 