

export interface ISubMod<T> {
    parent: T
    set_parent(parent: T): void
}


export class SubMod<T = any> implements ISubMod<T> {
    parent!:   T;
    set_parent(parent: T): void {
        this.parent = parent;
    }
}
