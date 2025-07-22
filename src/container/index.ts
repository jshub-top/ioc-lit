
import "reflect-metadata";
import { Identifier, Target } from "..";


export class Container {

    _service = new Map<Target, InstanceType<Target>>()

    resolve<T>(target: Target): T {
        return this._service.get(target)
    }

    registry(target: Target, instance: any, cover = true) {

        // 如果存在
        if (this._service.has(target)) {
            // 如果 不覆盖
            if (!cover) return
        }

        this._service.set(target, instance)
    }
}
