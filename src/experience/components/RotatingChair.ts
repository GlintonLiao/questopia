import Experience from "../Experience"
import * as THREE from "three"

import World from "../World"
import Time from "../utils/Time"
import Resources from "../Resources"

export default class RotatingChair {
	experience: Experience
	resources: Resources
	scene: THREE.Scene
	world: World
	time: Time
	item: any

	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.scene = this.experience.scene
		this.world = this.experience.world
		this.time = this.experience.time

		this.setModel()
	}

	setModel(): void {
		this.item = {}
		this.item.group = this.resources.items.chairModel.scene.children[0]
		this.scene.add(this.item.group)

		this.item.group.traverse((_child: { material: any }) => {
			if (_child instanceof THREE.Mesh) {
				_child.material = this.world.baked.room.material
			}
		})
	}

	update() {
		this.item.group.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
	}
}
