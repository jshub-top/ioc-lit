

export const IdentifierOption = "Identifier:option"
export const IdentifierParam = "Identifier:Param"


/**
 * Provider装饰器
 * 用于将类标记为可注入的服务
 */
export enum Lifecycle {
    Singleton = 'singleton',
    Transient = 'transient'
}

export interface ProviderMetadata {
    lifecycle?: Lifecycle
}

export function Provider(option: ProviderMetadata = {}): ClassDecorator {
    return function(target) {
        // params mate
        Reflect.defineMetadata(
            IdentifierParam,
            Reflect.getOwnMetadata("design:paramtypes", target),
            target
        )

        // provider mate
        Reflect.defineMetadata(
            IdentifierOption,
            {
                lifecycle: Lifecycle.Singleton,
                ... option
            },
            target
        )

        return target;
    }
}



