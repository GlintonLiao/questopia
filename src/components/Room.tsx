import { useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

import vertexShader from '../shaders/baked/vertex.glsl'
import fragmentShader from '../shaders/baked/fragment.glsl'

export default function Room() {
  const { scene } = useGLTF('/assets/model.glb')
  const bakedDayTexture = useTexture('/assets/bakedDayTexture.jpg')
  const bakedNightTexture = useTexture('/assets/bakedNightTexture.jpg')
  const lightMapTexture = useTexture('/assets/lightMapTexture.jpg')

  bakedDayTexture.flipY = false
  bakedNightTexture.flipY = false
  lightMapTexture.flipY = false

  const debugValues = useControls('Room', {
    nightMix: { value: 0, min: 0, max: 1 },
    screenColor: '#99C2DB',
    screenStrength: { value: 1.5, min: 0, max: 3 },
    lampColor: '#FFD05F',
    lampStrength: { value: 1.6, min: 0, max: 3 },
    shelfColor: '#9d5bb0',
    shelfStrength: { value: 1.0, min: 0, max: 3 },
  }, { collapsed: true })

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: bakedDayTexture },
        uBakedNightTexture: { value: bakedNightTexture },
        uLightMapTexture: { value: lightMapTexture },
        uNightMix: { value: debugValues.nightMix },
        uLightScreenColor: { value: new THREE.Color(debugValues.screenColor) },
        uLightScreenStrength: { value: debugValues.screenStrength },
        uLightLampColor: { value: new THREE.Color(debugValues.lampColor) },
        uLightLampStrength: { value: debugValues.lampStrength },
        uLightShelfColor: { value: new THREE.Color(debugValues.shelfColor) },
        uLightShelfStrength: { value: debugValues.shelfStrength },
      },
      vertexShader,
      fragmentShader,
    })
  }, [bakedDayTexture, bakedNightTexture, lightMapTexture, debugValues])

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
