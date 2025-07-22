import "reflect-metadata";
import { Identifier, IdentifierInject, IdentifierOption, IdentifierParam, Lifecycle, Target, type InjectMatePayload, type ProviderMetadata } from "..";

/**
 * @description class Container. Provide service manage
 */
export class Container {
    /**
     * @description service container. to HashMap save
     */
    _service = new Map<Target, InstanceType<Target>>();

    /**
     * @description weak service container. this run app create target instance
     */
    _service_weak = new ContainerWake();

    /**
     *
     * @param target
     * @returns target instance
     */
    resolve<T>(target: Target): T {
        return this._service.get(target);
    }

    registry(target: Target, instance: any, cover = true) {
        // 如果存在
        if (this._service.has(target)) {
            // 如果 不覆盖
            if (!cover) return;
        }

        this._service.set(target, instance);
    }

    run<T extends Target>(target: T): InstanceType<T> {
        /**
         * @description clear weak service.
         */
        this._service_weak._service.clear();

        const _run = (target: T) => {
            /**
             * @description if container have this target. if found, return this instance.
             */
            if (this._service.has(target)) {
                return this.resolve(target);
            }

            /**
             * @description if weak container have this target. if found, return this instance.
             */
            if (this._service_weak._service.has(target)) {
                return this._service_weak.resolve(target);
            }

            /**
             * @description property depend.
             */
            const inject_list: InjectMatePayload[] = Reflect.getOwnMetadata(IdentifierInject, target);
            inject_list?.map((v) => Object.assign(target.prototype, { [v.key]: _run(<T>v.target) }));

            /**
             * @description target args. recursion to create depend
             */
            const provider: T[] = Reflect.getOwnMetadata(IdentifierParam, target);
            const args: InstanceType<T>[] = provider?.map((item) => _run(item)) ?? [];

            /**
             * @description create target instance
             */
            const instance = new target(...args);

            /**
             * @description get target option
             */
            const option: ProviderMetadata = Reflect.getOwnMetadata(IdentifierOption, target);

            /**
             * @description if lifecycle is Singleton to container. Use next time
             */
            if (option.lifecycle !== Lifecycle.Singleton) this.registry(target, instance);

            /**
             * @description to weak service. if two and more use this target, is the same
             */
            this._service_weak.registry(target, instance);

            return instance;
        };

        return _run(target);
    }
}

export class ContainerWake {
    _service = new Map<Target, InstanceType<Target>>();

    resolve<T>(target: Target): T {
        return this._service.get(target);
    }

    registry(target: Target, instance: any, cover = true) {
        // 如果存在
        if (this._service.has(target)) {
            // 如果 不覆盖
            if (!cover) return;
        }

        this._service.set(target, instance);
    }
}
