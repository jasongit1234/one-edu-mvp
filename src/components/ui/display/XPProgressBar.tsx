import React from 'react'

interface XPProgressBarProps {
  totalXP: number
  level: number
  xpToNextLevel: number
  className?: string
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  totalXP,
  level,
  xpToNextLevel,
  className = '',
}) => {
  // Calculate progress percentage for current level
  const levelStartXP = totalXP - xpToNextLevel
  const progressInCurrentLevel = totalXP - levelStartXP
  const progressPercentage = (progressInCurrentLevel / (level * 100)) * 100

  const getXPNeededForNextLevel = () => {
    return xpToNextLevel
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Level and XP Info */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Level {level}
          </div>
          <span className="text-sm font-medium text-gray-600">
            {totalXP.toLocaleString()} XP
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {getXPNeededForNextLevel()} XP to next level
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"></div>
        
        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-pulse"></div>
        </div>

        {/* Level up animation trigger */}
        {progressPercentage >= 100 && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse rounded-full"></div>
        )}
      </div>

      {/* XP Details */}
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>
          {Math.floor(progressInCurrentLevel)} / {level * 100} XP
        </span>
        <span>
          {Math.round(progressPercentage)}% complete
        </span>
      </div>
    </div>
  )
}

export default XPProgressBar 