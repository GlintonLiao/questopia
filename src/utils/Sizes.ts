import EventEmitter from "./EventEmitter";

interface Viewport {
    width?: number
    height?: number
}

export default class Sizes extends EventEmitter {

    viewport: Viewport
    sizeViewport: HTMLDivElement
    width?: number
    height?: number

    constructor() {
        super()

        // viewport
        this.viewport = {}
        this.sizeViewport = document.createElement('div')
        this.sizeViewport.style.width = '100vw'
        this.sizeViewport.style.height = '100vh'
        this.sizeViewport.style.position = 'absolute'
        this.sizeViewport.style.top = '0'
        this.sizeViewport.style.left = '0'
        this.sizeViewport.style.pointerEvents = 'none'

        // resize event
        this.resize = this.resize.bind(this)
    }

    resize(): void {
        document.body.appendChild(this.sizeViewport)
        this.viewport.width = this.sizeViewport.offsetWidth
        this.viewport.height = this.sizeViewport.offsetHeight
        document.body.removeChild(this.sizeViewport)

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.trigger('resize')
    }
}
