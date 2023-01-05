import * as THREE from "three"

import Experience from "../Experience.js"

export default class Screen extends THREE.EventDispatcher {
    experience: Experience
    scene: THREE.Scene

    mesh: THREE.Mesh
    sourcePath: string

    model: {
        mesh?: THREE.Mesh
        texture?: THREE.Texture
        material?: THREE.MeshBasicMaterial
    }

    constructor(_mesh, _sourcePath) {
        super()
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.mesh = _mesh
        this.sourcePath = _sourcePath

        this.setModel()
    }

    setModel(): void {
        this.model = {}

        // // Element
        // this.model.element = document.createElement('video')
        // this.model.element.muted = true
        // this.model.element.loop = true
        // this.model.element.controls = true
        // this.model.element.playsInline = true
        // this.model.element.autoplay = true
        // this.model.element.src = this.sourcePath
        // this.model.element.play()

        // Texture
        this.model.texture = new THREE.TextureLoader().load(this.sourcePath)
        this.model.texture.encoding = THREE.sRGBEncoding

        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture,
        })

        // Mesh
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)
    }

    show(): void {
        const projectPage: HTMLDivElement = document.querySelector(".projects")
        projectPage.classList.add("visible")

        const closeBtn: HTMLDivElement = document.querySelector(".close-btn")
        const handle = () => {
            projectPage.classList.remove("visible")
            closeBtn.removeEventListener("click", handle)
        }
        closeBtn.addEventListener("click", handle)
        const hover = document.querySelector(".programming")
        hover.classList.remove("visible")
    }

    update() {}
}
