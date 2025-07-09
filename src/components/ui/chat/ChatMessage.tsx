import React, { memo } from 'react'

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  isMobile?: boolean
}

const ChatMessage = memo(({ role, content, timestamp, isMobile = false }: ChatMessageProps) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Handle system messages differently (typically used for context)
  if (role === 'system') {
    return null // Don't render system messages in the chat
  }

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${isMobile ? 'max-w-[85%]' : 'max-w-[70%]'} rounded-2xl px-${isMobile ? '3' : '4'} py-${isMobile ? '2' : '3'} ${
          role === 'user'
            ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white shadow-lg border border-blue-300/30'
            : 'bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg border border-purple-200/50'
        }`}
      >
        {role === 'assistant' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs">
              🌟
            </div>
            <span className="text-xs font-medium text-purple-600">Astra</span>
          </div>
        )}

        <div className={`whitespace-pre-wrap break-words ${isMobile ? 'text-sm' : 'text-base'}`}>
          {content}
        </div>

        <div className={`text-xs mt-1 ${role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Only re-render if content or role changes
  return (
    prevProps.role === nextProps.role && 
    prevProps.content === nextProps.content && 
    prevProps.isMobile === nextProps.isMobile
  )
})

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage 