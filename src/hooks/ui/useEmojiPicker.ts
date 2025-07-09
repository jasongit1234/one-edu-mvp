import { useToggle } from '../core/useToggle'
import { useMobileDetection } from './useMobileDetection'
import { useClickOutside } from '../core/useClickOutside'

export const useEmojiPicker = () => {
  const { value: isOpen, setTrue: open, setFalse: close, toggle } = useToggle(false)
  const { isMobile } = useMobileDetection()
  const ref = useClickOutside<HTMLDivElement>(close, isOpen && !isMobile)

  const handleEmojiSelect = (emoji: string, onEmojiSelect: (emoji: string) => void) => {
    onEmojiSelect(emoji)
    // Don't auto-close - let user select multiple emojis
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  return {
    isOpen,
    open,
    close,
    toggle,
    isMobile,
    ref,
    handleEmojiSelect,
    handleBackdropClick
  }
} 