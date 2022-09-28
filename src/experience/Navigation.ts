import * as THREE from 'three'
import normalizeWheel from 'normalize-wheel'
import Experience, { Config } from './Experience'

export default class Navigation {

    experience: Experience
    camera: any
    view?: any
    config: Config
    scene: any
    time: any

    constructor() {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setView()
    }

    setView(): void {
        this.view = {}

        this.view.spherical = {}
        this.view.spherical.value = new THREE.Spherical(5.5, Math.PI * 0.41, Math.PI * 0.15)
        this.view.spherical.smoothed = this.view.spherical.value.clone()
        this.view.spherical.smoothing = 0.005
        this.view.spherical.limits = {}
        this.view.spherical.limits.radius = { min: 2, max: 6.5 }
        this.view.spherical.limits.phi = { min: 0.01, max: Math.PI * 0.5 }
        this.view.spherical.limits.theta = { min: -Math.PI * 0.5, max: 0 }

        this.view.target = new THREE.Vector3(-0.4, 0.4, 0.25)
        this.view.target.limits = {}
        this.view.target.limits.x = { min: - 4, max: 4 }
        this.view.target.limits.y = { min: 1, max: 6 }
        this.view.target.limits.z = { min: - 4, max: 4 }

        // const origin = new THREE.Vector3( 0, 0, 0 );
        // const length = 1;
        // const hex = 0xffff00;

        // const arrowHelper = new THREE.ArrowHelper( this.view.target, origin, length, hex );
        // this.scene.add( arrowHelper );

        this.view.drag = {}
        this.view.drag.delta = {}
        this.view.drag.delta.x = 0
        this.view.drag.delta.y = 0
        this.view.drag.previous = {}
        this.view.drag.previous.x = 0
        this.view.drag.previous.y = 0
        this.view.drag.sensitivity = 1.2

        this.view.zoom = {}
        this.view.zoom.sensitivity = 0.01
        this.view.zoom.delta = 0

        // mothods
        this.view.down = (_x: number, _y: number): void => {
            this.view.drag.previous.x = _x
            this.view.drag.previous.y = _y
        }

        this.view.move = (_x: number, _y: number): void => {
            this.view.drag.delta.x += _x - this.view.drag.previous.x
            this.view.drag.delta.y += _y - this.view.drag.previous.y

            this.view.drag.previous.x = _x
            this.view.drag.previous.y = _y
        }

        this.view.up = () => {
            
        }

        this.view.zoomIn = (_delta: number): void => {
            this.view.zoom.delta += _delta
        }

        // Mouse events
        this.view.onMouseDown = (_event: MouseEvent): void => {
            _event.preventDefault()

            this.view.down(_event.clientX, _event.clientY)
            
            window.addEventListener('mouseup', this.view.onMouseUp)
            window.addEventListener('mousemove', this.view.onMouseMove)
        }

        this.view.onMouseMove = (_event: MouseEvent): void => {

            _event.preventDefault()
            this.view.move(_event.clientX, _event.clientY)
        }

        this.view.onMouseUp = (_event: MouseEvent): void => {
            _event.preventDefault()

            this.view.up()
            window.removeEventListener('mouseup', this.view.onMouseUp)
            window.removeEventListener('mousemove', this.view.onMouseMove)
        }

        this.view.onContextMenu = (_event: MouseEvent): void => {
            _event.preventDefault()
        }

        window.addEventListener('mousedown', this.view.onMouseDown)
        window.addEventListener('contextmenu', this.view.onContextMenu)

        /**
         * Touch events
         */
        this.view.onTouchStart = (_event: TouchEvent): void => {
            _event.preventDefault()

            this.view.drag.alternative = _event.touches.length > 1

            this.view.down(_event.touches[0].clientX, _event.touches[0].clientY)

            window.addEventListener('touchend', this.view.onTouchEnd)
            window.addEventListener('touchmove', this.view.onTouchMove)
        }

        this.view.onTouchMove = (_event: TouchEvent): void => {
            _event.preventDefault()
            
            this.view.move(_event.touches[0].clientX, _event.touches[0].clientY)
        }

        this.view.onTouchEnd = (_event: TouchEvent): void => {
            _event.preventDefault()
            
            this.view.up()

            window.removeEventListener('touchend', this.view.onTouchEnd)
            window.removeEventListener('touchmove', this.view.onTouchMove)
        }

        window.addEventListener('touchstart', this.view.onTouchStart)

        /**
         * Wheel
         */
        this.view.onWheel = (_event: WheelEvent): void => {
            _event.preventDefault()

            const normalized = normalizeWheel(_event)
            this.view.zoomIn(normalized.pixelY)
        }
        
        window.addEventListener('mousewheel', this.view.onWheel, { passive: false })
        window.addEventListener('wheel', this.view.onWheel, { passive: false })
    }

    update(): void {

        // zoom
        this.view.spherical.value.radius += this.view.zoom.delta * this.view.zoom.sensitivity

        // Apply limits
        this.view.spherical.value.radius = Math.min(Math.max(this.view.spherical.value.radius, this.view.spherical.limits.radius.min), this.view.spherical.limits.radius.max)

        // drag
        this.view.spherical.value.theta -= this.view.drag.delta.x * this.view.drag.sensitivity / this.config.smallestSide
        this.view.spherical.value.phi -= this.view.drag.delta.y * this.view.drag.sensitivity / this.config.smallestSide

        this.view.drag.delta.x = 0
        this.view.drag.delta.y = 0
        this.view.zoom.delta = 0

        // smoothing
        this.view.spherical.smoothed.radius += (this.view.spherical.value.radius - this.view.spherical.smoothed.radius) * this.view.spherical.smoothing * this.time.delta
        this.view.spherical.smoothed.phi += (this.view.spherical.value.phi - this.view.spherical.smoothed.phi) * this.view.spherical.smoothing * this.time.delta
        this.view.spherical.smoothed.theta += (this.view.spherical.value.theta - this.view.spherical.smoothed.theta) * this.view.spherical.smoothing * this.time.delta

        // view
        const viewPosition = new THREE.Vector3()
        viewPosition.setFromSpherical(this.view.spherical.smoothed)

        this.camera.modes.default.instance.position.copy(viewPosition)
        this.camera.modes.default.instance.lookAt(this.view.target)
    }
}