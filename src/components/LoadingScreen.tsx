import type { IntroStage } from '../App'

interface LoadingScreenProps {
  progress: number
  stage: IntroStage
  onEnter: () => void
}

export default function LoadingScreen({ progress, stage, onEnter }: LoadingScreenProps) {
  return (
    <div className={`loading-screen stage-${stage}`}>
      <div className="intro-content">
        <h1 className="intro-title">Questopia</h1>
        <p className="intro-subtitle">A 3D room · Online portfolio</p>

        <div className="intro-loader">
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loading-text">{Math.round(progress)}%</div>
        </div>

        <button
          className={`intro-enter-btn ${stage === 'ready' ? ' visible' : ''}`}
          onClick={onEnter}
        >
          Enter
        </button>
      </div>
    </div>
  )
}
