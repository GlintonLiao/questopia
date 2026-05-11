import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const INTERACTIVE_SCREEN_NAMES = new Set(['Cube349', 'Cube346'])

export default function InteractiveObjects() {
  const { scene } = useThree()
  const hintTimeout = useRef<number | null>(null)
  const clearHighlightTimeout = useRef<number | null>(null)

  useEffect(() => {
    hintTimeout.current = window.setTimeout(() => {
      // Show hover labels
      const labels = document.querySelectorAll<HTMLElement>('.hover-label')
      labels.forEach((el) => el.classList.add('visible'))

      // Highlight interactive objects
      const highlightedMaterials: Array<{
        material: THREE.Material & { color?: THREE.Color }
        color: THREE.Color
      }> = []

      scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          INTERACTIVE_SCREEN_NAMES.has(child.name)
        ) {
          const mat = child.material as THREE.Material & { color?: THREE.Color }
          if (mat.color) {
            highlightedMaterials.push({ material: mat, color: mat.color.clone() })
            mat.color.set('#66ccff')
          }
        }
      })

      clearHighlightTimeout.current = window.setTimeout(() => {
        labels.forEach((el) => el.classList.remove('visible'))
        highlightedMaterials.forEach(({ material, color }) => {
          material.color?.copy(color)
        })
      }, 1200)
    }, 5000)

    return () => {
      if (hintTimeout.current !== null) {
        clearTimeout(hintTimeout.current)
      }
      if (clearHighlightTimeout.current !== null) {
        clearTimeout(clearHighlightTimeout.current)
      }
    }
  }, [scene])

  return null
}
