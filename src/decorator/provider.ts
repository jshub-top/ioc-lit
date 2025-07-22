

export const IdentifierOption = "Identifier:option"
export const IdentifierParam = "Identifier:Param"


/**
 * Provider装饰器
 * 用于将类标记为可注入的服务
 */
export enum Lifecycle {
    /**
     * @description 单例模式
     */
    Singleton = 'singleton',

    /**
     * @description 临时模式
     */
    Transient = 'transient'
}

export interface ProviderMetadata {
    lifecycle?: Lifecycle
}

export function Provider(option: ProviderMetadata = {}): ClassDecorator {
    return function(target) {
        /**
         * @description set target mate data design:paramtypes
         */
        Reflect.defineMetadata(
            IdentifierParam,
            Reflect.getOwnMetadata("design:paramtypes", target),
            target
        )

        /**
         * @description set targert option
         */
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



