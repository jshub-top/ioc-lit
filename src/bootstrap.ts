import { Container, IdentifierOption, IdentifierParam, Lifecycle, ProviderMetadata, Target } from ".";

export const run = function<T extends Target>(target: T, container: Container = new Container()): InstanceType<T> {

    if (container._service.has(target)) {
        return container.resolve(target)
    }

    const provider: Target[] = Reflect.getOwnMetadata(IdentifierParam, target);

    let args: any[] = [];
    if (provider) {
        args = provider.map((item) => {
            const option: ProviderMetadata = Reflect.getOwnMetadata(IdentifierOption, item) ;
            if (!container._service.has(item) && option.lifecycle !== Lifecycle.Singleton) {
                container.registry(item, run(item, container));
            }
            return container.resolve(item);
        });
    }

    const instance = new target(...args);

    const option: ProviderMetadata = Reflect.getOwnMetadata(IdentifierOption, target);
    if (option.lifecycle !== Lifecycle.Singleton) {
        container.registry(target, instance);
    }

    return instance;
};
