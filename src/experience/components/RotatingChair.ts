import * as THREE from "three"

import Experience from "../Experience"
import Resources from "../Resources"
import World from "../World"
import Time from "../utils/Time"

export default class RotatingChair {
    experience: Experience
    resources: Resources
    scene: THREE.Scene
    world: World
    time: Time

    item: {
        group?: THREE.Mesh
    }

    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.world = this.experience.world
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.setModel()
    }

    setModel(): void {
        this.item = {}
        this.item.group = this.resources.items.chairModel.scene.children[0]

        this.item.group.traverse((_child: THREE.Object3D) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.world.baked.room.material
            }
        })
        this.scene.add(this.item.group)
    }

    update(): void {
        this.item.group.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
    }
}
