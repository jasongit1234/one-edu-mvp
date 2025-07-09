import React from 'react'

interface AnimatedDotsProps {
  variant?: 'progress' | 'typing' | 'loading'
  count?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  spacing?: 'tight' | 'normal' | 'wide'
  className?: string
  label?: string
}

const AnimatedDots: React.FC<AnimatedDotsProps> = ({
  variant = 'progress',
  count = 3,
  size = 'md',
  color = 'purple',
  spacing = 'normal',
  className = '',
  label
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-1.5 h-1.5'
      case 'md':
        return 'w-2 h-2 sm:w-3 sm:h-3'
      case 'lg':
        return 'w-3 h-3 sm:w-4 sm:h-4'
      default:
        return 'w-2 h-2 sm:w-3 sm:h-3'
    }
  }

  const getSpacingClasses = () => {
    switch (spacing) {
      case 'tight':
        return 'space-x-1'
      case 'normal':
        return 'space-x-1.5 sm:space-x-2'
      case 'wide':
        return 'space-x-2 sm:space-x-3'
      default:
        return 'space-x-1.5 sm:space-x-2'
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'bg-purple-500'
      case 'pink':
        return 'bg-pink-500'
      case 'blue':
        return 'bg-blue-500'
      case 'green':
        return 'bg-green-500'
      case 'yellow':
        return 'bg-yellow-500'
      case 'gray':
        return 'bg-gray-500'
      default:
        return 'bg-purple-500'
    }
  }

  const getAnimation = () => {
    switch (variant) {
      case 'typing':
        return 'animate-bounce'
      case 'loading':
        return 'animate-pulse'
      default:
        return 'animate-pulse'
    }
  }

  const renderDots = () => {
    const dots = []
    const sizeClasses = getSizeClasses()
    const colorClasses = getColorClasses()
    const animation = getAnimation()

    for (let i = 0; i < count; i++) {
      const delay = variant === 'typing' ? i * 0.1 : i * 0.2
      dots.push(
        <div
          key={`dot-${i}`}
          className={`${sizeClasses} ${colorClasses} rounded-full ${animation}`}
          style={{ animationDelay: `${delay}s` }}
        />
      )
    }

    return dots
  }

  const containerClasses = `flex items-center justify-center ${getSpacingClasses()} ${className}`

  if (variant === 'typing' && label) {
    return (
      <div className="flex items-center space-x-2">
        <div className={containerClasses}>
          {renderDots()}
        </div>
        <span className="text-sm text-purple-600">{label}</span>
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      {renderDots()}
    </div>
  )
}

export default AnimatedDots 