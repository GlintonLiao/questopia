import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Title() {
  const { scene } = useGLTF('/assets/title.glb')

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#C1D2FF' }),
    [],
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

  return <primitive object={clonedScene} />
}
