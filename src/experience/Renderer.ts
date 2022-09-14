import * as THREE from 'three'
import Experience, { Config } from './Experience'
import Time from './utils/Time'
import Sizes from './utils/Sizes'
import Stats from './utils/Stats'
import GUI from 'lil-gui'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import Camera from './Camera'

export default class Renderer {

    experience: Experience
    config: Config
    time: Time
    sizes: Sizes
    stats: Stats
    debug: GUI
    scene: THREE.Scene
    usePostprocess: boolean
    postProcess: any
    clearColor: string
    camera: Camera

    debugFolder: GUI

    instance?: THREE.WebGLRenderer
    context: WebGLRenderingContext | WebGL2RenderingContext
    renderTarget: THREE.WebGLRenderTarget

    constructor(_options: object = {}) {
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.stats = this.experience.stats
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        if (this.debug) {
            this.debugFolder = this.debug.addFolder('renderer')
        }

        this.usePostprocess = false

        this.setInstance()
        this.setPostProcess()
    }

    setInstance(): void {
        this.clearColor = '#010101'

        // renderer
        this.instance = new THREE.WebGLRenderer({
            alpha: false, 
            antialias: true,
        })

        this.instance.domElement.style.position = 'absolute'
        this.instance.domElement.style.top = '0'
        this.instance.domElement.style.left = '0'
        this.instance.domElement.style.width = '100%'
        this.instance.domElement.style.height = '100%'
        
        this.instance.setClearColor(this.clearColor, 1)
        this.instance.setSize(this.config.width, this.config.height)
        this.instance.setPixelRatio(this.config.pixelRatio)

        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.NoToneMapping
        this.instance.toneMappingExposure = 1

        this.context = this.instance.getContext()

        // stats panel
        if (this.stats) this.stats.setRenderPanel(this.context)

        if (this.debug) {
            this.debugFolder
                .addColor(this, 'clearColor')
                .onChange(() => {
                    this.instance.setClearColor(this.clearColor)
                })
            
            this.debugFolder
                .add(this.instance, 'toneMapping', {
                    'NoToneMapping': THREE.NoToneMapping,
                    'LinearToneMapping': THREE.LinearToneMapping,
                    'ReinhardToneMapping': THREE.ReinhardToneMapping,
                    'CineonToneMapping': THREE.CineonToneMapping,
                    'ACESFilmicToneMapping': THREE.ACESFilmicToneMapping
                })
                .onChange(() => {
                    this.scene.traverse((_child: THREE.Object3D<THREE.Event>) => {
                        if (_child instanceof THREE.Mesh) _child.material.needsUpdate = true
                    })
                })
            
            this.debugFolder
                .add(this.instance, 'toneMappingExposure')
                .min(0)
                .max(10)
        }
    }

    setPostProcess(): void {

        this.postProcess = {}

        // render pass
        this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)

        // effect composer
        this.renderTarget = new THREE.WebGLRenderTarget(
            this.config.width, 
            this.config.height, 
            {
                generateMipmaps: false, 
                minFilter: THREE.LinearFilter, 
                magFilter: THREE.LinearFilter, 
                format: THREE.RGBFormat, 
                encoding: THREE.sRGBEncoding, 
                samples: 2, 
            }
        )

        this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)
        this.postProcess.composer.setSize(this.config.width, this.config.height)
        this.postProcess.composer.setPixelRatio(this.config.pixelRatio)

        this.postProcess.composer.addPass(this.postProcess.renderPass)
    }

    resize(): void {
        // Instance
        this.instance.setSize(this.config.width, this.config.height)
        this.instance.setPixelRatio(this.config.pixelRatio)

        // Post process
        this.postProcess.composer.setSize(this.config.width, this.config.height)
        this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
    }

    update(): void {
        if (this.stats) this.stats.beforeRender()
        if (this.usePostprocess) this.postProcess.composer.render()
        else this.instance.render(this.scene, this.camera.instance)
        if (this.stats) this.stats.afterRender()
    }

    destroy(): void {
        this.instance.renderLists.dispose()
        this.instance.dispose()
        this.renderTarget.dispose()
        this.postProcess.composer.renderTarget1.dispose()
        this.postProcess.composer.renderTarget2.dispose()
    }

}
