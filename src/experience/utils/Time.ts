import EventEmitter from "./EventEmitter"

export default class Time extends EventEmitter {
    start: number
    current: number
    elapsed: number
    delta: number
    playing: boolean
    ticker: number = 0

    constructor() {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.playing = true

        this.tick = this.tick.bind(this)
        this.tick()
    }

    tick(): void {
        this.ticker = window.requestAnimationFrame(this.tick)

        const current = Date.now()

        this.delta = current - this.current
        this.elapsed += this.playing ? this.delta : 0
        this.current = current

        if (this.delta > 60) this.delta = 60
        if (this.playing) this.trigger("tick")
    }

    // stop
    stop(): void {
        window.cancelAnimationFrame(this.ticker)
    }
}
