import * as THREE from 'three'
import { Scene } from 'three'
import Experience from './Experience'
import World from './World'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

export default class Raycaster {

    experience: Experience
    world: World
    scene: Scene
    pointer: THREE.Vec2
    raycaster: THREE.Raycaster
    screen: any
    currentObj: any
    outlinePass: OutlinePass
    camera: THREE.Camera
    effectComposer: EffectComposer
    chair: any
    renderer: THREE.Renderer
    

    constructor() {

        this.experience = new Experience()
        this.world = this.experience.world
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance

        this.screen = this.world.bigScreen
        this.currentObj = null
        
        this.setCaster()
    }

    setCaster(): void {

        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()
        
        window.addEventListener( 'pointermove', (e) => {
            this.pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        });

        this.obj1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 0.1, 0.1),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )
        this.obj1.position.set(-1, 1, 1)
    }

    update(): void {
        this.raycaster.setFromCamera(this.pointer, this.experience.camera.instance)
        const intersects = this.raycaster.intersectObject(this.screen.model.mesh)

        if (intersects.length) {
            if (!this.currentObj) {
                this.currentObj = intersects[0].object
                this.currentObj.material.color.set('#99c2db')
                console.log(this.currentObj.material.color);
                
            }
            this.scene.add(this.obj1)
            
        } else {
            if (this.currentObj) {
               this.currentObj.material.color.set(0xffffff)
               this.currentObj = null
            }
            this.scene.remove(this.obj1)
        }
    }
}
