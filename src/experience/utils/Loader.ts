import Experience from "../Experience";
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export default class Loader extends EventEmitter {

    experience: Experience
    renderer: any

    toLoad: number
    loaded: number
    items: any

    constructor() {
        super()

        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance

        this.setLoaders()

        this.toLoad = 0
        this.loaded = 0
        this.items = {}
    }

    
}