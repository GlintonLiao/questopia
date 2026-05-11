import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, useProgress } from '@react-three/drei'
import Room from './Room'
import Title from './Title'
import ArchiModels from './ArchiModels'
import Screens from './Screens'
import Images from './Images'
import RotatingChair from './RotatingChair'
import CoffeeSteam from './CoffeeSteam'
import CameraRig from './CameraRig'
import InteractiveObjects from './InteractiveObjects'
import HoverLabels from './HoverLabels'
import InteractionRaycaster from './InteractionRaycaster'

interface ExperienceProps {
  onOpenOverlay: (kind: 'current' | 'previous') => void
  onProgress: (progress: number) => void
  onReady: () => void
}

function ProgressTracker({ onProgress, onReady }: { onProgress: (p: number) => void; onReady: () => void }) {
  const { progress, active } = useProgress()

  useEffect(() => {
    onProgress(progress)
  }, [progress, onProgress])

  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(onReady, 600)
      return () => clearTimeout(timer)
    }
    return
  }, [active, progress, onReady])

  return null
}

export default function Experience({ onOpenOverlay, onProgress, onReady }: ExperienceProps) {
  const dpr =
    typeof window !== 'undefined'
      ? Math.min(Math.max(window.devicePixelRatio, 1), window.innerWidth < 768 ? 1.5 : 2)
      : 2

  return (
    <Canvas
      camera={{ fov: 25, near: 0.1, far: 150, position: [0, 0, 5] }}
      gl={{
        antialias: true,
        outputColorSpace: 'srgb',
      }}
      dpr={[1, dpr]}
      frameloop="always"
    >
      <ProgressTracker onProgress={onProgress} onReady={onReady} />
      <CameraRig />
      <Room />
      <Title />
      <ArchiModels />
      <Screens onOpenOverlay={onOpenOverlay} />
      <Images onOpenOverlay={onOpenOverlay} />
      <InteractionRaycaster onOpenOverlay={onOpenOverlay} />
      <RotatingChair />
      <CoffeeSteam />
      <InteractiveObjects />
      <HoverLabels />
      <Preload all />
    </Canvas>
  )
}
