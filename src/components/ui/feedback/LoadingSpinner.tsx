interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export const LoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
        <p className="text-white text-xl font-semibold">{message}</p>
      </div>
    </div>
  )
}

// Compact version for inline loading
export const CompactLoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mb-2 mx-auto"></div>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}

// Button loading state
export const ButtonLoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      <span>{message}</span>
    </div>
  )
}

export default LoadingSpinner 