import * as THREE from 'three'
import Baked from './Baked.js'
import ArchiModel from './components/ArchiModels.js'
import Title from './components/Title.js'
import Experience, { Config } from './Experience.js'
import Resources from './Resources.js'

export default class World
{
    experience: Experience
    config: Config
    scene: THREE.Scene
    resources: Resources

    room: any = {}
    title: any = {}
    archiModel: ArchiModel
    baked: Baked

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
                // this.setDummy()
                // this.setRoom()
                this.setBaked()
                this.setTitle()
                this.setArchiModel()
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

    setBaked(): void {
        this.baked = new Baked()
    }

    setRoom(): void {
        this.room = {}
        this.room.model = this.resources.items.roomModel.scene
        this.scene.add(this.room.model)
        this.room.texture = this.resources.items.bakedDayTexture
        this.room.texture.encoding = THREE.sRGBEncoding
        this.room.texture.flipY = false
        this.room.material = new THREE.MeshBasicMaterial({ map: this.room.texture})

        console.log(this.room);
        
        this.room.model.traverse((_child: { material: any }) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.room.material
            }
        })

        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
        
        // const directionalLight = new THREE.DirectionalLight('#ffffff', 7)
        // directionalLight.position.set(1, 5, 10)
        // this.scene.add(directionalLight)
    }

    setTitle(): void {
        this.title = new Title()
    }

    setArchiModel(): void {
        this.archiModel = new ArchiModel()
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}
