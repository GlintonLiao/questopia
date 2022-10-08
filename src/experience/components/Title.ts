import * as THREE from "three"
import Experience from "../Experience"
import Resources from "../Resources"

export default class Title {
    experience: Experience
    resources: Resources
    scene: THREE.Scene

    item: {
        model?: THREE.Mesh
        material?: THREE.MeshBasicMaterial
    }

    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setModel()
    }

    setModel(): void {
        this.item = {}
        this.item.model = this.resources.items.titleModel.scene
        this.scene.add(this.item.model)
        this.item.material = new THREE.MeshBasicMaterial({ color: "#C1D2FF" })

        this.item.model.traverse((_child: THREE.Object3D) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.item.material
            }
        })
    }
}
