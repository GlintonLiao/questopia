import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function ArchiModels() {
  const { scene } = useGLTF('/assets/archiModelLight.glb')

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#99b5ff' }),
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
