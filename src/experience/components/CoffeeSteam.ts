import * as THREE from 'three'

import Experience from '../Experience.js'
import vertexShader from '../shaders/coffeeSteam/vertex.glsl'
import fragmentShader from '../shaders/coffeeSteam/fragment.glsl'
import Resources from '../Resources.js'
import { Pane } from 'tweakpane'
import { Scene } from 'three'
import Time from '../utils/Time.js'

export default class CoffeeSteam
{

    experience: Experience
    resources: Resources
    debug: any
    scene: Scene
    time: Time

    debugFolder: any
    model: any

    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'Coffee steam',
                expanded: false
            })
        }

        this.setModel()
    }

    setModel()
    {
        this.model = {}
        
        this.model.color = '#ffffff'

        // Material
        this.model.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms:
            {
                uTime: { value: 0 },
                uTimeFrequency: { value: 0.0006 },
                uUvFrequency: { value: new THREE.Vector2(3, 3) },
                uColor: { value: new THREE.Color(this.model.color) }
            }
        })

        // Mesh
        this.model.mesh = this.resources.items.coffeeSteamModel.scene.children[0]
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)

        if (this.debug)
        {
            this.debugFolder.addInput(
                this.model,
                'color',
                {
                    label: 'Color',
                    view: 'color'
                }
            )
            .on('change', () =>
            {
                this.model.material.uniforms.uColor.value.set(this.model.color)
            })
            
            
            this.debugFolder.addInput(
                this.model.material.uniforms.uTimeFrequency,
                'value',
                {
                    label: 'Frequency', min: 0.0001, max: 0.001, step: 0.0001
                }
            )
            
            this.debugFolder.addInput(
                this.model.material.uniforms.uUvFrequency.value,
                'x',
                {
                    min: 0.001, max: 10, step: 0.001
                }
            )
            
            this.debugFolder.addInput(
                this.model.material.uniforms.uUvFrequency.value,
                'y',
                {
                    min: 0.001, max: 10, step: 0.001
                }
            )
        }
    }

    update()
    {
        this.model.material.uniforms.uTime.value = this.time.elapsed
    }
}
