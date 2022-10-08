import Experience from "../Experience"
import EventEmitter from "./EventEmitter"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

export default class Loader extends EventEmitter {
    experience: Experience
    renderer: any

    toLoad: number
    loaded: number
    items: any

    loaders?: any[]

    constructor() {
        super()

        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance

        this.setLoaders()

        this.toLoad = 0
        this.loaded = 0
        this.items = {}
    }

    setLoaders(): void {
        this.loaders = []

        // image
        this.loaders.push({
            extensions: ["jpg", "png"],
            action: (_resource) => {
                const image = new Image()
                image.addEventListener("load", () => {
                    this.fileLoadEnd(_resource, image)
                })
                image.addEventListener("error", () => {
                    this.fileLoadEnd(_resource, image)
                })
                image.src = _resource.source
            },
        })

        // Draco
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath("draco/")
        dracoLoader.setDecoderConfig({ type: "js" })

        this.loaders.push({
            extensions: ["drc"],
            action: (_resource) => {
                dracoLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)

                    // instance method
                    dracoLoader.dispose()
                })
            },
        })

        // GLTF
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        this.loaders.push({
            extensions: ["glb", "gltf"],
            action: (_resource) => {
                gltfLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            },
        })

        // FBX
        const fbxLoader = new FBXLoader()

        this.loaders.push({
            extensions: ["fbx"],
            action: (_resource) => {
                fbxLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            },
        })

        // RGBE | HDR
        const rgbeLoader = new RGBELoader()

        this.loaders.push({
            extensions: ["hdr"],
            action: (_resource) => {
                rgbeLoader.load(_resource.source, (_data) => {
                    this.fileLoadEnd(_resource, _data)
                })
            },
        })
    }

    /**
     * Load
     */
    load(_resources = []) {
        for (const _resource of _resources) {
            this.toLoad++
            const extensionMatch = _resource.source.match(/\.([a-z]+)$/)

            if (typeof extensionMatch[1] !== "undefined") {
                const extension = extensionMatch[1]
                const loader = this.loaders.find((_loader) =>
                    _loader.extensions.find(
                        (_extension) => _extension === extension
                    )
                )

                if (loader) {
                    loader.action(_resource)
                } else {
                    console.warn(`Cannot found loader for ${_resource}`)
                }
            } else {
                console.warn(`Cannot found extension of ${_resource}`)
            }
        }
    }

    /**
     * File load end
     */
    fileLoadEnd(_resource, _data) {
        this.loaded++
        this.items[_resource.name] = _data

        this.trigger("fileEnd", [_resource, _data])

        if (this.loaded === this.toLoad) {
            this.trigger("end")
        }
    }
}
