import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

import vertexShader from '../shaders/baked/vertex.glsl'
import fragmentShader from '../shaders/baked/fragment.glsl'

export default function RotatingChair() {
  const { scene } = useGLTF('/assets/chairModel.glb')
  const bakedDayTexture = useTexture('/assets/bakedDayTexture.jpg')
  const bakedNightTexture = useTexture('/assets/bakedNightTexture.jpg')
  const lightMapTexture = useTexture('/assets/lightMapTexture.jpg')
  bakedDayTexture.flipY = false
  bakedNightTexture.flipY = false
  lightMapTexture.flipY = false

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: bakedDayTexture },
        uBakedNightTexture: { value: bakedNightTexture },
        uLightMapTexture: { value: lightMapTexture },
        uNightMix: { value: 0 },
        uLightScreenColor: { value: new THREE.Color('#99C2DB') },
        uLightScreenStrength: { value: 1.5 },
        uLightLampColor: { value: new THREE.Color('#FFD05F') },
        uLightLampStrength: { value: 1.6 },
        uLightShelfColor: { value: new THREE.Color('#9d5bb0') },
        uLightShelfStrength: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [bakedDayTexture, bakedNightTexture, lightMapTexture])

  const chairObject = useMemo(() => {
    const cloned = scene.clone(true)
    const chair = cloned.children[0]
    chair.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material
      }
    })
    return chair
  }, [scene, material])

  // Direct mutation on the object (no ref needed)
  useFrame((_state) => {
    chairObject.rotation.y = Math.sin(_state.clock.elapsedTime * 0.5) * 0.5
  })

  return <primitive object={chairObject} />
}
