interface LoadingScreenProps {
  progress: number
  ready: boolean
}

export default function LoadingScreen({ progress, ready }: LoadingScreenProps) {
  return (
    <div className={`loading-screen ${ready ? 'fade-out' : ''}`}>
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="loading-text">
        {Math.round(progress)}% loaded
      </div>
    </div>
  )
}
