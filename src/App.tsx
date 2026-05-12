import { Suspense, useEffect, useState, useCallback } from 'react'
import Experience from './components/Experience'
import Overlay from './components/Overlay'
import LoadingScreen from './components/LoadingScreen'

type OverlayKind = 'none' | 'current' | 'previous'
export type IntroStage = 'loading' | 'ready' | 'entering' | 'done'

declare global {
  interface Window {
    __questopiaOverlayOpen?: OverlayKind
    __questopiaOpenOverlay?: (kind: OverlayKind) => void
  }
}

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState<OverlayKind>('none')
  const [progress, setProgress] = useState(0)
  const [introStage, setIntroStage] = useState<IntroStage>('loading')

  const handleOpenOverlay = useCallback((kind: OverlayKind) => {
    window.__questopiaOverlayOpen = kind
    setOverlayOpen(kind)
  }, [])

  const handleCloseOverlay = useCallback(() => {
    window.__questopiaOverlayOpen = 'none'
    setOverlayOpen('none')
  }, [])

  const handleProgress = useCallback((p: number) => {
    setProgress(p)
  }, [])

  const handleReady = useCallback(() => {
    setIntroStage('ready')
  }, [])

  const handleEnter = useCallback(() => {
    setIntroStage('entering')
  }, [])

  const handleIntroDone = useCallback(() => {
    setIntroStage('done')
  }, [])

  useEffect(() => {
    const handleQuestopiaOpenOverlay = (event: Event) => {
      const kind = (event as CustomEvent<OverlayKind>).detail
      if (kind === 'current' || kind === 'previous') {
        handleOpenOverlay(kind)
      }
    }

    window.addEventListener('questopia:open-overlay', handleQuestopiaOpenOverlay)

    return () => {
      window.removeEventListener('questopia:open-overlay', handleQuestopiaOpenOverlay)
    }
  }, [handleOpenOverlay])

  useEffect(() => {
    window.__questopiaOpenOverlay = handleOpenOverlay

    return () => {
      if (window.__questopiaOpenOverlay === handleOpenOverlay) {
        delete window.__questopiaOpenOverlay
      }
    }
  }, [handleOpenOverlay])

  return (
    <>
      <Suspense fallback={null}>
        <Experience
          onOpenOverlay={handleOpenOverlay}
          onProgress={handleProgress}
          onReady={handleReady}
          introStage={introStage}
          onIntroDone={handleIntroDone}
        />
      </Suspense>
      <LoadingScreen progress={progress} stage={introStage} onEnter={handleEnter} />
      <Overlay kind={overlayOpen} onClose={handleCloseOverlay} />

      <div className={`control ${introStage !== 'done' ? 'intro-hidden' : ''}`}>
        <p><strong>Drag</strong>: rotate</p>
        <p><strong>Shift</strong>: move</p>
        <p><strong>Wheel</strong>: zoom</p>
      </div>

      <div className={`info-wrapper ${introStage !== 'done' ? 'intro-hidden' : ''}`}>
        <div className="info">
          <a target="_blank" href="https://github.com/GlintonLiao/questopia" rel="noopener noreferrer">
            Github
          </a>
        </div>
      </div>
    </>
  )
}
