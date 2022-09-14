import * as THREE from 'three'
import Experience, { Config } from './Experience.js'
import Resources from './Resources.js'

export default class World
{
    experience: Experience
    config: Config
    scene: THREE.Scene
    resources: Resources

    constructor(_options?: any)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setDummy()
            }
        })
    }

    setDummy(): void
    {
        this.resources.items.lennaTexture.encoding = THREE.sRGBEncoding
        
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
        )
        this.scene.add(cube)        
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}
