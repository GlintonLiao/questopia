import * as THREE from 'three'


import Experience from './Experience.js'
import vertexShader from './shaders/baked/vertex.glsl'
import fragmentShader from './shaders/baked/fragment.glsl'
import Resources from './Resources.js'
import { Scene } from 'three'
import Time from './utils/Time.js'

export default class Baked
{

    experience: Experience
    resources: Resources
    debug: any
    scene: Scene
    time: Time
    debugFolder: any
    room: any
    images: any
    colors: any
    mixed: any

    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.mixed = {
            value: 0
        }

        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'Settings',
                expanded: true
            })
        }

        this.setRoom()
        this.setImages()
        this.setDebug()
    }

    setRoom(): void
    {
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

        // this.model.lightMapTexture = this.resources.items.lightMapTexture
        // this.model.lightMapTexture.flipY = false

        this.colors = {}
        this.colors.tv = '#ff115e'
        this.colors.desk = '#ff6700'
        this.colors.pc = '#0082ff'

        this.room.material = new THREE.ShaderMaterial({
            uniforms:
            {
                uBakedDayTexture: { value: this.room.bakedDayTexture },
                uBakedNightTexture: { value: this.room.bakedNightTexture },
                // uLightMapTexture: { value: this.room.lightMapTexture },

                uNightMix: { value: this.mixed.value },

                uLightTvColor: { value: new THREE.Color(this.colors.tv) },
                uLightTvStrength: { value: 1.47 },

                // uLightDeskColor: { value: new THREE.Color(this.colors.desk) },
                // uLightDeskStrength: { value: 1.9 },

                // uLightPcColor: { value: new THREE.Color(this.colors.pc) },
                // uLightPcStrength: { value: 1.4 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.room.model.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.room.material
            }
        })

        this.scene.add(this.room.model)
        
    }

    setImages(): void {
        this.images = {}
        this.images.model = this.experience.resources.items.imagesModel.scene
        this.images.imagesDayTexture = this.experience.resources.items.imagesDayTexture
        this.images.imagesDayTexture.flipY = false;
        this.images.imagesNightTexture = this.experience.resources.items.imagesNightTexture
        this.images.imagesNightTexture.flipY = false;

        this.images.material = new THREE.ShaderMaterial({
            uniforms: {
                uBakedDayTexture: { value: this.images.imagesDayTexture },
                uBakedNightTexture: { value: this.images.imagesNightTexture },
                // uLightMapTexture: { value: this.room.lightMapTexture },

                uNightMix: { value: this.mixed.value },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.images.model.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.images.material
            }
        })

        this.scene.add(this.images.model)
    }

    setDebug(): void {
        if (this.debug)
        {
            // this.debugFolder
            //     .addInput(
            //         this.room.material.uniforms.uNightMix,
            //         'value',
            //         { label: 'uNightMix', min: 0, max: 1 }
            //     )

            this.debugFolder
                .addInput(
                    this.mixed,
                    'value',
                    { label: 'uMix', min: 0, max: 1 }
                )
                .on('change', () => {
                    this.room.material.uniforms.uNightMix.value 
                    = this.images.material.uniforms.uNightMix.value 
                    = this.mixed.value
                })

            this.debugFolder
                .addInput(
                    this.colors,
                    'tv',
                    { view: 'color' }
                )
                .on('change', () =>
                {
                    this.room.material.uniforms.uLightTvColor.value.set(this.colors.tv)
                })

            this.debugFolder
                .addInput(
                    this.room.material.uniforms.uLightTvStrength,
                    'value',
                    { label: 'uLightTvStrength', min: 0, max: 3 }
                )

            // this.debugFolder
            //     .addInput(
            //         this.colors,
            //         'desk',
            //         { view: 'color' }
            //     )
            //     .on('change', () =>
            //     {
            //         this.room.material.uniforms.uLightDeskColor.value.set(this.colors.desk)
            //     })

            // this.debugFolder
            //     .addInput(
            //         this.room.material.uniforms.uLightDeskStrength,
            //         'value',
            //         { label: 'uLightDeskStrength', min: 0, max: 3 }
            //     )

            // this.debugFolder
            //     .addInput(
            //         this.colors,
            //         'pc',
            //         { view: 'color' }
            //     )
            //     .on('change', () =>
            //     {
            //         this.room.material.uniforms.uLightPcColor.value.set(this.colors.pc)
            //     })

            // this.debugFolder
            //     .addInput(
            //         this.room.material.uniforms.uLightPcStrength,
            //         'value',
            //         { label: 'uLightPcStrength', min: 0, max: 3 }
            //     )
        }
    }
}