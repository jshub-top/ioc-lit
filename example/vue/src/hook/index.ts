import { Target } from "ioc-lit";
import { container } from "../context";

export interface ServiceOption {
    dropWithUnmounted?: boolean;
}

export const useService = function <T extends Target>(target: T) {
    const instance = container.run<T>(target);
    return instance;
};
