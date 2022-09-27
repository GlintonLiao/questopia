import * as THREE from 'three'
import Experience from './Experience'

export default class Navigation {

    experience: Experience
    camera: any
    view?: any

    constructor() {
        this.experience = new Experience()
        this.camera = this.experience.camera

        this.setView()
    }

    setView(): void {
        this.view = {}

        this.view.spherical = {}
        this.view.spherical.value = new THREE.Spherical(6, Math.PI * 0.4, Math.PI * 0.2)
        this.view.spherical.smoothed = this.view.spherical.value.clone()
        this.view.spherical.smoothing = 0.005

        this.view.target = new THREE.Vector3(-0.5, 0.4, 0)
    }

    update(): void {
        // view
        const viewPosition = new THREE.Vector3()
        viewPosition.setFromSpherical(this.view.spherical.value)

        this.camera.modes.default.instance.position.copy(viewPosition)
        this.camera.modes.default.instance.lookAt(this.view.target)
    }
}