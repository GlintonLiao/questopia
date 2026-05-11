import { useMemo } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ScreensProps {
  onOpenOverlay: (kind: 'current' | 'previous') => void
}

export default function Screens({ onOpenOverlay }: ScreensProps) {
  const { scene: bigScene } = useGLTF('/assets/bigScreenModel.glb')
  const { scene: smallScene } = useGLTF('/assets/smallScreenModel.glb')
  const bigTexture = useTexture('/assets/bigScreenImage.jpg')
  const smallTexture = useTexture('/assets/smallScreenImage.jpg')

  bigTexture.colorSpace = THREE.SRGBColorSpace
  smallTexture.colorSpace = THREE.SRGBColorSpace

  const bigMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ map: bigTexture }),
    [bigTexture],
  )
  const smallMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ map: smallTexture }),
    [smallTexture],
  )

  const bigCloned = useMemo(() => {
    const cloned = bigScene.clone(true)
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = bigMaterial
      }
    })
    return cloned
  }, [bigScene, bigMaterial])

  const smallCloned = useMemo(() => {
    const cloned = smallScene.clone(true)
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = smallMaterial
      }
    })
    return cloned
  }, [smallScene, smallMaterial])

  const handleOpenCurrent = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onOpenOverlay('current')
  }

  return (
    <>
      <primitive
        object={bigCloned}
        onClick={handleOpenCurrent}
      />
      <primitive
        object={smallCloned}
        onClick={handleOpenCurrent}
      />
    </>
  )
}
