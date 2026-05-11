import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SCREEN_MESH_NAMES = new Set(['Cube349', 'Cube346'])
const IMAGE_MESH_NAMES = new Set(['Cube389', 'Cube390', 'Cube391', 'Cube392', 'Cube394'])
const CLICK_MOVE_THRESHOLD = 6

declare global {
  interface Window {
    __questopiaOpenOverlay?: (kind: 'current' | 'previous' | 'none') => void
    __questopiaLastHit?: {
      event: 'pointerdown' | 'pointerup' | 'click' | 'no-targets' | 'no-hit'
      targetCount?: number
      hitName?: string
      overlayKind?: 'current' | 'previous'
      pointer?: { x: number; y: number }
    }
  }
}

interface InteractionRaycasterProps {
  onOpenOverlay: (kind: 'current' | 'previous') => void
}

export default function InteractionRaycaster({ onOpenOverlay }: InteractionRaycasterProps) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const pointerDown = useRef<{ x: number; y: number; button: number } | null>(null)

  useEffect(() => {
    const domElement = gl.domElement
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    const collectTargets = () => {
      const targets: THREE.Mesh[] = []

      scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          (SCREEN_MESH_NAMES.has(child.name) || IMAGE_MESH_NAMES.has(child.name))
        ) {
          targets.push(child)
        }
      })

      return targets
    }

    const tryOpenOverlay = (event: PointerEvent) => {
      const rect = domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      camera.updateMatrixWorld(true)
      scene.updateMatrixWorld(true)

      const targets = collectTargets()
      window.__questopiaLastHit = {
        event: targets.length === 0 ? 'no-targets' : 'click',
        targetCount: targets.length,
        pointer: { x: pointer.x, y: pointer.y },
      }

      if (targets.length === 0) return

      raycaster.setFromCamera(pointer, camera)
      const [hit] = raycaster.intersectObjects(targets, false)
      if (!hit) {
        window.__questopiaLastHit = {
          event: 'no-hit',
          targetCount: targets.length,
          pointer: { x: pointer.x, y: pointer.y },
        }
        return
      }

      window.__questopiaLastHit = {
        event: 'click',
        targetCount: targets.length,
        hitName: hit.object.name,
        pointer: { x: pointer.x, y: pointer.y },
      }

      const overlayKind = SCREEN_MESH_NAMES.has(hit.object.name)
        ? 'current'
        : IMAGE_MESH_NAMES.has(hit.object.name)
          ? 'previous'
          : null

      if (overlayKind) {
        window.__questopiaLastHit = {
          event: 'click',
          targetCount: targets.length,
          hitName: hit.object.name,
          overlayKind,
          pointer: { x: pointer.x, y: pointer.y },
        }
        onOpenOverlay(overlayKind)
        window.__questopiaOpenOverlay?.(overlayKind)
        window.dispatchEvent(new CustomEvent('questopia:open-overlay', {
          detail: overlayKind,
        }))
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      pointerDown.current = {
        x: event.clientX,
        y: event.clientY,
        button: event.button,
      }
      window.__questopiaLastHit = { event: 'pointerdown' }
    }

    const onPointerUp = (event: PointerEvent) => {
      const down = pointerDown.current
      pointerDown.current = null

      if (!down || down.button !== 0) return

      const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y)
      if (moved > CLICK_MOVE_THRESHOLD) return

      window.__questopiaLastHit = { event: 'pointerup' }
      tryOpenOverlay(event)
    }

    domElement.addEventListener('pointerdown', onPointerDown, true)
    domElement.addEventListener('pointerup', onPointerUp, true)

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown, true)
      domElement.removeEventListener('pointerup', onPointerUp, true)
    }
  }, [camera, gl, onOpenOverlay, scene])

  return null
}
