// src/lib/common/shared.ts

import { setContext, getContext } from 'svelte';

class SharedValue {
    value = $state('');

    update(newValue: string) {
        this.value = newValue;
    }
}

const KEY = Symbol('shared-value');

export function setSharedValue() {
    return setContext(KEY, new SharedValue());
}

export function getSharedValue() {
    return getContext<SharedValue>(KEY);
}
