import { createContext } from 'svelte';

class SharedValue {
    #_value: string = $state('');

    set(newValue: string) {
        this.#_value = newValue;
    }

    get(): string {
        return this.#_value;
    }
}

export const [getSharedValue, setSharedValue] = createContext<SharedValue>();
