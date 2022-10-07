import * as THREE from "three"

import Experience from "../Experience.js"
import Resources from "../Resources.js"
import World from "../World.js"

export default class Images extends THREE.EventDispatcher {
	experience: Experience
	resources: Resources
	scene: THREE.Scene
	item: any
	debug: any
	world: World
	camera: THREE.PerspectiveCamera

	model: any
	raycaster: THREE.Raycaster
	pointer: THREE.Vec2

	constructor() {
		super()
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.scene = this.experience.scene
		this.world = this.experience.world
		this.raycaster = this.world.raycaster
		this.camera = this.experience.camera.instance

		this.setModel()
	}

	setModel() {
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

		this.model.mesh.traverse((_child) => {
			if (_child instanceof THREE.Mesh) {
				_child.material = this.model.material
			}
		})

		this.scene.add(this.model.mesh)
	}

	show() {
		const projectPage = document.querySelector(".prev-projects")
		projectPage.classList.add("visible")

		const closeBtn = document.querySelector(".prev-close-btn")
		const handle = () => {
			projectPage.classList.remove("visible")
			closeBtn.removeEventListener("click", handle)
		}
		closeBtn.addEventListener("click", handle)
	}

	update() {}
}
