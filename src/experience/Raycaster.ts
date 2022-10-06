import * as THREE from 'three'
import Experience from './Experience'
import World from './World'
import Screen from './components/Screen'

export default class Raycaster {

    experience: Experience
    world: World
    scene: THREE.Scene
    pointer: THREE.Vec2
    raycaster: THREE.Raycaster
    camera: THREE.Camera
    
    currentObj: any
    objs: any
    bigScreen: Screen
    smallScreen: Screen
    targetElement: any
    images: any

    hoverPages: any[]
    

    constructor() {

        this.experience = new Experience()
        this.world = this.experience.world
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.targetElement = this.experience.targetElement

        this.bigScreen = this.world.bigScreen
        this.smallScreen = this.world.smallScreen
        this.currentObj = null
        this.images = this.world.images
        this.objs = [this.bigScreen.model.mesh, this.smallScreen.model.mesh, this.images.model.mesh]

        this.hoverPages = [
            {
                position: new THREE.Vector3(-1, 0.8, 0.3),
                element: document.querySelector('.programming')
            },
            {
                position: new THREE.Vector3(-0.8, 1, 0.4),
                element: document.querySelector('.architecture')
            },
        ]
        
        this.setCaster()
    }

    setCaster(): void {

        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()
        
        this.targetElement.addEventListener( 'pointermove', (e) => {
            this.pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        });

        this.targetElement.addEventListener('click', () => {
            if (!this.currentObj) return
            if (this.currentObj.name === 'Cube349') {
                this.bigScreen.show()
            } else {
                this.images.show()
            }
        })
    }

    update(): void {
        this.raycaster.setFromCamera(this.pointer, this.experience.camera.instance)

        const intersects = this.raycaster.intersectObjects(this.objs)
        
        if (intersects.length) {
            if (!this.currentObj) {
                this.currentObj = intersects[0].object
                this.currentObj.material.color.set("#347867")
                
                let idx = 1
                if (this.currentObj.name === "Cube349" || 
                    this.currentObj.name == "Cube346") idx = 0
                
                const screenPosition = this.hoverPages[idx].position.clone()
                screenPosition.project(this.experience.camera.instance)
                console.log(this.hoverPages[idx].element);
    
                this.hoverPages[idx].element.classList.add("visible")
                const translateX = screenPosition.x * this.experience.sizes.width * 0.5
                const translateY = - screenPosition.y * this.experience.sizes.height * 0.5
                this.hoverPages[idx].element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
            }
        } else {
            if (this.currentObj) {
                this.currentObj.material.color.set(0xffffff)
                this.hoverPages[0].element.classList.remove("visible")
                this.hoverPages[1].element.classList.remove("visible")
                this.currentObj = null
            }
        }
    }
}
