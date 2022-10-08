import * as THREE from "three"

import Experience from "../Experience.js"
import Resources from "../Resources.js"

export default class Images extends THREE.EventDispatcher {
    experience: Experience
    resources: Resources
    scene: THREE.Scene

    model: {
        texture?: THREE.Texture
        material?: THREE.MeshBasicMaterial
        mesh?: THREE.Mesh
    }

    constructor() {
        super()
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setModel()
    }

    setModel(): void {
        this.model = {}

        // Texture
        this.model.texture = this.resources.items.imagesDayTexture
        this.model.texture.flipY = false
        this.model.texture.encoding = THREE.sRGBEncoding
        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture,
        })

        // Mesh
        this.model.mesh = this.resources.items.imagesModel.scene
        this.model.mesh.material = this.model.material

        this.model.mesh.traverse((_child: THREE.Object3D) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.model.material
            }
        })

        this.scene.add(this.model.mesh)
    }

    show(): void {
        const projectPage: HTMLDivElement =
            document.querySelector(".prev-projects")
        projectPage.classList.add("visible")

        const closeBtn: HTMLDivElement =
            document.querySelector(".prev-close-btn")
        const handle = () => {
            projectPage.classList.remove("visible")
            closeBtn.removeEventListener("click", handle)
        }
        closeBtn.addEventListener("click", handle)
    }

    update() {}
}
