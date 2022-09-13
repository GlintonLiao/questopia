import * as THREE from 'three'
import GUI from 'lil-gui'
import Time from '../utils/Time'
import Sizes from '../utils/Sizes'
import Stats from '../utils/Stats'

interface OptionProps {
    targetElement: HTMLDivElement
}

interface Config {
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

    config?: Config
    stats?: Stats

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
        this.setSence()
        this.setCamera()
        this.setRenderer()
        this.setResouces()
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
            this.stats = new Stats(true)
        }
    }
}