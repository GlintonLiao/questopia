import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

import vertexShader from '../shaders/coffeeSteam/vertex.glsl'
import fragmentShader from '../shaders/coffeeSteam/fragment.glsl'

export default function CoffeeSteam() {
  const { scene } = useGLTF('/assets/coffeeSteamModel.glb')
  const meshRef = useRef<THREE.Group>(null)

  const debugValues = useControls('Coffee Steam', {
    color: '#ffffff',
    timeFrequency: { value: 0.0006, min: 0.0001, max: 0.001, step: 0.0001 },
    uvFrequencyX: { value: 3, min: 0.001, max: 10, step: 0.001 },
    uvFrequencyY: { value: 3, min: 0.001, max: 10, step: 0.001 },
  }, { collapsed: true })

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uTimeFrequency: { value: debugValues.timeFrequency },
        uUvFrequency: { value: new THREE.Vector2(debugValues.uvFrequencyX, debugValues.uvFrequencyY) },
        uColor: { value: new THREE.Color(debugValues.color) },
      },
      vertexShader,
      fragmentShader,
    })
  }, [debugValues])

  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true)
    const steam = cloned.children[0]
    steam.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material
      }
    })
    return steam
  }, [scene, material])

  useFrame((_state) => {
    material.uniforms.uTime.value = _state.clock.elapsedTime * 1000
  })

  return <primitive ref={meshRef} object={clonedScene} />
}
