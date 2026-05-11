import { Suspense, useEffect, useState, useCallback } from 'react'
import Experience from './components/Experience'
import Overlay from './components/Overlay'
import LoadingScreen from './components/LoadingScreen'

type OverlayKind = 'none' | 'current' | 'previous'

declare global {
  interface Window {
    __questopiaOverlayOpen?: OverlayKind
    __questopiaOpenOverlay?: (kind: OverlayKind) => void
  }
}

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState<OverlayKind>('none')
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

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
    setReady(true)
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
        />
      </Suspense>
      <LoadingScreen progress={progress} ready={ready} />
      <Overlay kind={overlayOpen} onClose={handleCloseOverlay} />

      <div className="control">
        <p><strong>Drag</strong>: rotate</p>
        <p><strong>Shift</strong>: move</p>
        <p><strong>Wheel</strong>: zoom</p>
      </div>

      <div className="info-wrapper">
        <div className="info">
          <a target="_blank" href="https://github.com/GlintonLiao/questopia" rel="noopener noreferrer">
            Github
          </a>
        </div>
      </div>
    </>
  )
}
