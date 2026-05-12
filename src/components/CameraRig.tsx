import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { IntroStage } from '../App'

const LIMITS = {
  radius: { min: 2, max: 6.5 },
  phi: { min: 0, max: Math.PI * 0.48 },
  theta: { min: -Math.PI * 0.05, max: Math.PI * 0.5 },
  targetX: { min: -0.5, max: 1 },
  targetY: { min: -0.3, max: 1 },
  targetZ: { min: -0.3, max: 1 },
}

const SPHERICAL_SMOOTHING = 0.005
const TARGET_SMOOTHING = 0.002
const ZOOM_SENSITIVITY = 0.01

// Default camera pose (the final landing point after intro)
const DEFAULT_SPHERICAL = new THREE.Spherical(5.5, Math.PI * 0.41, Math.PI * 0.15)
const DEFAULT_TARGET = new THREE.Vector3(-0.4, 0.4, 0.25)

// Intro start: further away, wider angle, slightly lower
const INTRO_START_SPHERICAL = new THREE.Spherical(8.8, Math.PI * 0.36, -Math.PI * 0.08)
const INTRO_START_TARGET = new THREE.Vector3(-0.25, 0.35, 0.2)
const INTRO_DURATION = 2.8 // seconds

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

// easeOutCubic: fast start, smooth stop
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

interface CameraRigProps {
  introStage: IntroStage
  onIntroDone: () => void
}

export default function CameraRig({ introStage, onIntroDone }: CameraRigProps) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const size = useThree((state) => state.size)

  const spherical = useRef(new THREE.Spherical(5.5, Math.PI * 0.41, Math.PI * 0.15))
  const sphericalSmoothed = useRef(spherical.current.clone())
  const target = useRef(new THREE.Vector3(-0.4, 0.4, 0.25))
  const targetSmoothed = useRef(target.current.clone())

  const dragDelta = useRef({ x: 0, y: 0 })
  const dragPrevious = useRef({ x: 0, y: 0 })
  const dragAlternative = useRef(false)
  const zoomDelta = useRef(0)
  const isDragging = useRef(false)

  // Intro animation tracking
  const introElapsed = useRef(0)
  const introDoneCalled = useRef(false)
  const introActiveRef = useRef(false)
  introActiveRef.current = introStage === 'entering'

  useEffect(() => {
    const domElement = gl.domElement

    const onPointerDown = (e: PointerEvent) => {
      if (introActiveRef.current) return
      e.preventDefault()
      // Only handle primary button or shift/ctrl
      isDragging.current = true
      dragAlternative.current = e.button === 2 || e.button === 1 || e.ctrlKey || e.shiftKey
      dragPrevious.current.x = e.clientX
      dragPrevious.current.y = e.clientY
      domElement.setPointerCapture?.(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (introActiveRef.current || !isDragging.current) return
      e.preventDefault()
      dragDelta.current.x += e.clientX - dragPrevious.current.x
      dragDelta.current.y += e.clientY - dragPrevious.current.y
      dragPrevious.current.x = e.clientX
      dragPrevious.current.y = e.clientY
    }

    const onPointerUp = (e: PointerEvent) => {
      if (introActiveRef.current) return
      isDragging.current = false
      domElement.releasePointerCapture?.(e.pointerId)
    }

    const onWheel = (e: WheelEvent) => {
      if (introActiveRef.current) return
      e.preventDefault()
      zoomDelta.current += e.deltaY
    }

    const onContextMenu = (e: Event) => {
      if (introActiveRef.current) return
      e.preventDefault()
    }

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if (introActiveRef.current) return
      e.preventDefault()
      isDragging.current = true
      dragAlternative.current = e.touches.length > 1
      dragPrevious.current.x = e.touches[0].clientX
      dragPrevious.current.y = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (introActiveRef.current || !isDragging.current) return
      e.preventDefault()
      dragDelta.current.x += e.touches[0].clientX - dragPrevious.current.x
      dragDelta.current.y += e.touches[0].clientY - dragPrevious.current.y
      dragPrevious.current.x = e.touches[0].clientX
      dragPrevious.current.y = e.touches[0].clientY
    }

    const onTouchEnd = () => {
      if (introActiveRef.current) return
      isDragging.current = false
    }

    // Canvas-level events (capture phase to beat R3F internal events)
    domElement.addEventListener('pointerdown', onPointerDown, true)
    domElement.addEventListener('wheel', onWheel, { passive: false, capture: true })
    domElement.addEventListener('contextmenu', onContextMenu, true)
    domElement.addEventListener('touchstart', onTouchStart, { passive: false, capture: true })

    // Window-level for move/up (catch release outside canvas)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown, true)
      domElement.removeEventListener('wheel', onWheel, { capture: true })
      domElement.removeEventListener('contextmenu', onContextMenu, true)
      domElement.removeEventListener('touchstart', onTouchStart, { capture: true })
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [gl])

  useFrame((_state, delta) => {
    // The previous controller used millisecond deltas. R3F passes seconds.
    const deltaMs = Math.min(delta * 1000, 100)
    const sp = spherical.current
    const t = target.current
    const smallestSide = Math.min(size.width, size.height)

    // ── Intro camera path ──
    if (introStage === 'entering') {
      introElapsed.current += delta
      const rawT = Math.min(introElapsed.current / INTRO_DURATION, 1)
      const et = easeOutCubic(rawT)

      // Interpolate spherical
      sp.radius = INTRO_START_SPHERICAL.radius + (DEFAULT_SPHERICAL.radius - INTRO_START_SPHERICAL.radius) * et
      sp.phi = INTRO_START_SPHERICAL.phi + (DEFAULT_SPHERICAL.phi - INTRO_START_SPHERICAL.phi) * et
      sp.theta = INTRO_START_SPHERICAL.theta + (DEFAULT_SPHERICAL.theta - INTRO_START_SPHERICAL.theta) * et

      // Interpolate target
      t.lerpVectors(INTRO_START_TARGET, DEFAULT_TARGET, et)

      // Sync smoothed values to avoid post-intro jump
      const spSm = sphericalSmoothed.current
      spSm.radius = sp.radius
      spSm.phi = sp.phi
      spSm.theta = sp.theta

      const tSm = targetSmoothed.current
      tSm.copy(t)

      // Apply camera
      const viewPosition = new THREE.Vector3().setFromSpherical(spSm)
      viewPosition.add(tSm)
      camera.position.copy(viewPosition)
      camera.lookAt(tSm)

      // Clear any accumulated input
      dragDelta.current.x = 0
      dragDelta.current.y = 0
      zoomDelta.current = 0

      if (rawT >= 1 && !introDoneCalled.current) {
        introDoneCalled.current = true
        onIntroDone()
      }
      return
    }

    // ── Normal interaction ──
    // Zoom
    if (zoomDelta.current !== 0) {
      sp.radius += zoomDelta.current * ZOOM_SENSITIVITY
      sp.radius = clamp(sp.radius, LIMITS.radius.min, LIMITS.radius.max)
      zoomDelta.current = 0
    }

    // Drag
    if (dragAlternative.current) {
      // Shift+drag: pan target
      const up = new THREE.Vector3(0, 1, 0)
      const right = new THREE.Vector3(-1, 0, 0)
      const camPos = new THREE.Vector3().setFromSpherical(sphericalSmoothed.current)
      camPos.add(targetSmoothed.current)
      const dummyCam = new THREE.PerspectiveCamera()
      dummyCam.position.copy(camPos)
      dummyCam.lookAt(targetSmoothed.current)
      const camQuat = dummyCam.quaternion.clone()

      up.applyQuaternion(camQuat)
      right.applyQuaternion(camQuat)
      up.multiplyScalar(dragDelta.current.y * 0.01)
      right.multiplyScalar(dragDelta.current.x * 0.01)

      t.add(up).add(right)
      t.x = clamp(t.x, LIMITS.targetX.min, LIMITS.targetX.max)
      t.y = clamp(t.y, LIMITS.targetY.min, LIMITS.targetY.max)
      t.z = clamp(t.z, LIMITS.targetZ.min, LIMITS.targetZ.max)
    } else if (dragDelta.current.x !== 0 || dragDelta.current.y !== 0) {
      // Normal drag: rotate
      sp.theta -= dragDelta.current.x / smallestSide
      sp.phi -= dragDelta.current.y / smallestSide
      sp.theta = clamp(sp.theta, LIMITS.theta.min, LIMITS.theta.max)
      sp.phi = clamp(sp.phi, LIMITS.phi.min, LIMITS.phi.max)
    }

    dragDelta.current.x = 0
    dragDelta.current.y = 0

    // Smooth spherical
    const spSm = sphericalSmoothed.current
    spSm.radius += (sp.radius - spSm.radius) * SPHERICAL_SMOOTHING * deltaMs
    spSm.phi += (sp.phi - spSm.phi) * SPHERICAL_SMOOTHING * deltaMs
    spSm.theta += (sp.theta - spSm.theta) * SPHERICAL_SMOOTHING * deltaMs

    // Smooth target
    const tSm = targetSmoothed.current
    tSm.x += (t.x - tSm.x) * TARGET_SMOOTHING * deltaMs
    tSm.y += (t.y - tSm.y) * TARGET_SMOOTHING * deltaMs
    tSm.z += (t.z - tSm.z) * TARGET_SMOOTHING * deltaMs

    // Apply camera
    const viewPosition = new THREE.Vector3().setFromSpherical(spSm)
    viewPosition.add(tSm)
    camera.position.copy(viewPosition)
    camera.lookAt(tSm)
  })

  return null
}
