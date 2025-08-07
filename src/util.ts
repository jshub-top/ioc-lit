export interface IDispose {
    dispose(): any | PromiseLike<any>
}


export class MacroTaskNext {
    private state = false
    public callback(fn: Function) {
        if (this.state) return
        this.state = true
        fn()
        queueMicrotask(() => {
            this.state = false
        })
    }
}
