import * as THREE from "three"

import Experience from "../Experience.js"
import Resources from "../Resources.js"
import Time from "../utils/Time.js"

import vertexShader from "../shaders/coffeeSteam/vertex.glsl"
import fragmentShader from "../shaders/coffeeSteam/fragment.glsl"

export default class CoffeeSteam {
    experience: Experience
    resources: Resources
    scene: THREE.Scene
    time: Time
    debug: any

    debugFolder: any
    model: any

    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder({
                title: "Coffee steam",
                expanded: false,
            })
        }

        this.setModel()
    }

    setModel(): void {
        this.model = {}
        this.model.color = "#ffffff"

        // material
        this.model.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uTimeFrequency: { value: 0.0006 },
                uUvFrequency: { value: new THREE.Vector2(3, 3) },
                uColor: { value: new THREE.Color(this.model.color) },
            },
        })

        // mesh
        this.model.mesh =
            this.resources.items.coffeeSteamModel.scene.children[0]
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)

        // debug
        if (this.debug) {
            this.debugFolder
                .addInput(this.model, "color", {
                    label: "Color",
                    view: "color",
                })
                .on("change", () => {
                    this.model.material.uniforms.uColor.value.set(
                        this.model.color
                    )
                })

            this.debugFolder.addInput(
                this.model.material.uniforms.uTimeFrequency,
                "value",
                {
                    label: "Frequency",
                    min: 0.0001,
                    max: 0.001,
                    step: 0.0001,
                }
            )

            this.debugFolder.addInput(
                this.model.material.uniforms.uUvFrequency.value,
                "x",
                {
                    min: 0.001,
                    max: 10,
                    step: 0.001,
                }
            )

            this.debugFolder.addInput(
                this.model.material.uniforms.uUvFrequency.value,
                "y",
                {
                    min: 0.001,
                    max: 10,
                    step: 0.001,
                }
            )
        }
    }

    update(): void {
        this.model.material.uniforms.uTime.value = this.time.elapsed
    }
}
