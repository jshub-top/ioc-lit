import type { Target } from "./common"


export const IdentifierInject = "Identifier:Inject"


export interface InjectMatePayload {
    key: string | symbol
    target: Target
    option: InjectOption
}

export interface InjectOption {
    target?: Target
}

export const Inject = function(option: InjectOption = {}): PropertyDecorator {
    return function(target, key,) {


        const inject_list: InjectMatePayload[] = Reflect.getOwnMetadata(IdentifierInject, target) || []
        inject_list.push({
            key,
            target: option.target || Reflect.getOwnMetadata("design:type", target, key),
            option,
        })
        Reflect.defineMetadata(
            IdentifierInject,
            inject_list,
            target.constructor
        )
    }
}
