import { Container, IdentifierInject, IdentifierOption, IdentifierParam, Lifecycle, ProviderMetadata, Target, type InjectMatePayload } from ".";

export const run = function <T extends Target>(target: T, container: Container = new Container()): InstanceType<T> {
    /**
     * @description if container have this target. if found, return this instance.
     */
    if (container._service.has(target)) {
        return container.resolve(target);
    }

    /**
     * @description get target used depend with mate data `IdentifierParam`
     */
    const provider: T[] = Reflect.getOwnMetadata(IdentifierParam, target);

    /**
     * @description target args. recursion to create depend
     */
    let args: any[] = [];
    if (provider) {
        args = provider.map((item) => run(item, container));
    }


    const inject_list: InjectMatePayload[] = Reflect.getOwnMetadata(IdentifierInject, target);
    inject_list?.map((v) => {
        target.prototype[v.key] = run(v.target, container);
    });


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
    if (option.lifecycle !== Lifecycle.Singleton) container.registry(target, instance);

    return instance;
};
