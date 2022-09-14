import * as THREE from 'three'
import GUI from 'lil-gui'
import Time from './utils/Time'
import Sizes from './utils/Sizes'
import Stats from './utils/Stats'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './Resources'
import Assets from './Assets'
import World from './World'

interface OptionProps {
    targetElement: HTMLDivElement
}

export interface Config {
    debug?: boolean
    pixelRatio?: number
    width?: number
    height?: number
}

export default class Experience
{
    static instance: Experience
    targetElement?: HTMLDivElement
    time?: Time
    sizes?: Sizes
    camera: Camera

    config?: Config
    stats?: Stats
    debug?: GUI

    scene?: THREE.Scene
    renderer: Renderer

    resources: Resources
    world: World

    constructor(_options?: OptionProps) {

        if (Experience.instance) {
            return Experience.instance
        } else {
            Experience.instance = this
        }

        // Options
        this.targetElement = _options?.targetElement

        if (!this.targetElement) {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.sizes = new Sizes()

        this.setConfig()
        this.setDebug()
        this.setStats()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.update()
    }

    setConfig(): void {
        this.config = {}

        // debug
        this.config.debug = window.location.hash === '#debug'

        // pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // width and height
        const boundings = this.targetElement?.getBoundingClientRect()
        this.config.width = boundings?.width
        this.config.height = boundings?.height || window.innerHeight
    }

    setDebug(): void {
        if (this.config?.debug) {
            this.debug = new GUI()
        }
    }

    setStats(): void {
        if (this.config?.debug) {
            this.stats = new Stats(true)
        }
    }

    setScene(): void {
        this.scene = new THREE.Scene()
    }

    setCamera(): void {
        this.camera = new Camera()
    }

    setRenderer(): void {
        this.renderer = new Renderer() // no args
        this.targetElement.appendChild(this.renderer.instance.domElement)
    }

    setResources(): void {
        this.resources = new Resources(Assets)
    }

    setWorld(): void {
        this.world = new World()
    }

    update(): void {
        if (this.stats) this.stats.update()

        this.camera.update()

        if (this.world) this.world.update()
        if (this.renderer) this.renderer.update()

        window.requestAnimationFrame(() => {
            this.update()
        })
    }

    resize(): void {
        // config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height
        
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if (this.camera) this.camera.resize()
        if (this.renderer) this.renderer.resize()
        if (this.world) this.world.resize()
        
    }

    destory(): void {

    }
}
