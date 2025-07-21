
export type Identifier = string | Symbol;
export type MainTarget = Object & { run(): void }
export type MainMethodDecorator = <T>(target: MainTarget, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
export type Target = new (...args: any[]) => any;


export const get_target_identifier = (target: Function) => target.name;
