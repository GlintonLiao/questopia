import * as THREE from 'three'
import { EventDispatcher } from 'three'
import Experience from '../Experience.js'
import World from '../World.js'

export default class Screen extends EventDispatcher
{

    experience: Experience
    resources: any
    scene: THREE.Scene
    item: any
    debug: any
    world: World
    camera: any

    mesh: any
    sourcePath: any

    model: any
    raycaster: THREE.Raycaster
    pointer: THREE.Vec2

    constructor(_mesh, _sourcePath)
    {
        super()
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.world = this.experience.world
        this.raycaster = this.world.raycaster
        this.camera = this.experience.camera.instance

        this.mesh = _mesh
        this.sourcePath = _sourcePath

        this.setModel()
    }

    setModel()
    {
        this.model = {}

        // // Element
        // this.model.element = document.createElement('video')
        // this.model.element.muted = true
        // this.model.element.loop = true
        // this.model.element.controls = true
        // this.model.element.playsInline = true
        // this.model.element.autoplay = true
        // this.model.element.src = this.sourcePath
        // this.model.element.play()

        // Texture
        this.model.texture = new THREE.TextureLoader().load( this.sourcePath )
        this.model.texture.encoding = THREE.sRGBEncoding

        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture
        })

        // Mesh
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)
        
    }

    show() {
        const projectPage = document.querySelector('.projects')
        projectPage.classList.add('visible')
    }

    update() {   
    }
}