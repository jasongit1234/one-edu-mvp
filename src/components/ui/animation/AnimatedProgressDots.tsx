import React from 'react'
import AnimatedDots from './AnimatedDots'

const AnimatedProgressDots: React.FC = () => {
  return (
    <div className="mb-4 sm:mb-8">
      <AnimatedDots 
        variant="progress" 
        count={3} 
        size="md" 
        spacing="normal"
        className="justify-center"
      />
    </div>
  )
}

export default AnimatedProgressDots 