import * as THREE from "three"

import Experience from "./Experience.js"
import Resources from "./Resources.js"
import Time from "./utils/Time.js"

import vertexShader from "./shaders/baked/vertex.glsl"
import fragmentShader from "./shaders/baked/fragment.glsl"

export default class Baked {
    experience: Experience
    resources: Resources
    debug: any
    scene: THREE.Scene
    time: Time
    debugFolder: any
    room: any
    colors: { Screen: string; Lamp: string; Shelf: string }

    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder({
                title: "Settings",
                expanded: true,
            })
        }

        // colors
        this.colors = {
            Screen: "#99C2DB",
            Lamp: "#FFD05F",
            Shelf: "#9d5bb0",
        }

        this.setRoom()
        this.setDebug()
    }

    setRoom(): void {
        this.room = {}

        this.room.model = this.resources.items.roomModel.scene

        this.room.bakedDayTexture = this.resources.items.bakedDayTexture
        // this.room.bakedDayTexture.encoding = THREE.sRGBEncoding
        this.room.bakedDayTexture.flipY = false

        this.room.bakedNightTexture = this.resources.items.bakedNightTexture
        // this.room.bakedNightTexture.encoding = THREE.sRGBEncoding
        this.room.bakedNightTexture.flipY = false

        // this.model.bakedNeutralTexture = this.resources.items.bakedNeutralTexture
        // this.model.bakedNeutralTexture.encoding = THREE.sRGBEncoding
        // this.model.bakedNeutralTexture.flipY = false

        this.room.lightMapTexture = this.resources.items.lightMapTexture
        this.room.lightMapTexture.flipY = false

        this.room.material = new THREE.ShaderMaterial({
            uniforms: {
                uBakedDayTexture: { value: this.room.bakedDayTexture },
                uBakedNightTexture: { value: this.room.bakedNightTexture },
                uLightMapTexture: { value: this.room.lightMapTexture },

                uNightMix: { value: 0 },

                uLightScreenColor: {
                    value: new THREE.Color(this.colors.Screen),
                },
                uLightScreenStrength: { value: 1.5 },

                uLightLampColor: { value: new THREE.Color(this.colors.Lamp) },
                uLightLampStrength: { value: 1.6 },

                uLightShelfColor: { value: new THREE.Color(this.colors.Shelf) },
                uLightShelfStrength: { value: 1.0 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })

        this.room.model.traverse((_child) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.room.material
            }
        })

        this.scene.add(this.room.model)
    }

    setDebug(): void {
        if (this.debug) {
            this.debugFolder.addInput(
                this.room.material.uniforms.uNightMix,
                "value",
                {
                    label: "Day/Night",
                    min: 0,
                    max: 1,
                }
            )

            this.debugFolder
                .addInput(this.colors, "Screen", { view: "color" })
                .on("change", () => {
                    this.room.material.uniforms.uLightScreenColor.value.set(
                        this.colors.Screen
                    )
                })

            this.debugFolder.addInput(
                this.room.material.uniforms.uLightScreenStrength,
                "value",
                { label: "Screen Luminance", min: 0, max: 3 }
            )

            this.debugFolder
                .addInput(this.colors, "Lamp", { view: "color" })
                .on("change", () => {
                    this.room.material.uniforms.uLightLampColor.value.set(
                        this.colors.Lamp
                    )
                })

            this.debugFolder.addInput(
                this.room.material.uniforms.uLightLampStrength,
                "value",
                { label: "Lamp Luminance", min: 0, max: 3 }
            )

            this.debugFolder
                .addInput(this.colors, "Shelf", { view: "color" })
                .on("change", () => {
                    this.room.material.uniforms.uLightShelfColor.value.set(
                        this.colors.Shelf
                    )
                })

            this.debugFolder.addInput(
                this.room.material.uniforms.uLightShelfStrength,
                "value",
                { label: "Shelf Luminance", min: 0, max: 3 }
            )
        }
    }
}
