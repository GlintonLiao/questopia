import { useMemo } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ImagesProps {
  onOpenOverlay: (kind: 'current' | 'previous') => void
}

export default function Images({ onOpenOverlay }: ImagesProps) {
  const { scene } = useGLTF('/assets/imagesModel.glb')
  const texture = useTexture('/assets/imagesDayTexture.jpg')
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ map: texture }),
    [texture],
  )

  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true)
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material
      }
    })
    return cloned
  }, [scene, material])

  const handleOpenPrevious = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onOpenOverlay('previous')
  }

  return (
    <primitive
      object={clonedScene}
      onClick={handleOpenPrevious}
    />
  )
}
