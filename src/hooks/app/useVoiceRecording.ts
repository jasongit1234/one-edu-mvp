import { useState, useEffect, useCallback } from 'react'

export const useVoiceRecording = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if voice recording is supported
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSupported(true)
    }
  }, [])

  const startRecording = useCallback((onResult: (transcript: string) => void) => {
    if (!isSupported) {
      alert('Voice recording is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isRecording) {
      setIsRecording(false)
      return
    }

    setIsRecording(true)

    // @ts-expect-error - webkitSpeechRecognition is not in TypeScript types
    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsRecording(true)
    }

    recognition.onresult = (event: { results: Array<Array<{ transcript: string }>> }) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setIsRecording(false)
    }

    recognition.onerror = (event: { error: string }) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use voice chat.')
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }, [isSupported, isRecording])

  const stopRecording = useCallback(() => {
    setIsRecording(false)
  }, [])

  return {
    isRecording,
    isSupported,
    startRecording,
    stopRecording
  }
} 