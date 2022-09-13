import * as THREE from 'three'
import GUI from 'lil-gui'

type props = {
    targetElement: HTMLDivElement | null
}

export default class Experience
{
    static instance: Experience
    targetElement?: HTMLDivElement | null

    constructor(_options: props) {
        if (Experience.instance) {
            return Experience.instance
        } else {
            Experience.instance = this
        }

        // Options
        this.targetElement = _options.targetElement

        if (!this.targetElement) {
            console.warn('Missing \'targetElement\' property')
            return
        }

        
    }
}