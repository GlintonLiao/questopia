import Experience from "../Experience";
import EventEmitter from "./EventEmitter";

export default class Loader extends EventEmitter {

    experience: Experience
    renderer: any

    constructor() {
        super()

        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance
    }
}