import { run, Target } from "ioc";
import { container } from "../context";

export interface ServiceOption {
    dropWithUnmounted?: boolean;
}

export const useService = function <T extends Target>(target: T) {
    const instance = run<T>(target, container);
    return instance;
};
