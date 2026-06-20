// src/lib/common.ts

import { writable } from 'svelte/store';

export const alerts = writable([]);

export const triggerAlert = (message: string, type = 'info', timeout = 3000) => {
    const id = Date.now();
    alerts.update((all) => [...all, { id, message, type }]);

    setTimeout(() => {
        alerts.update((all) => all.filter((t) => t.id !== id));
    }, timeout);
};

// import { setContext, getContext } from 'svelte';
//
// class SharedValue {
//     value = $state('');
//
//     update(newValue: string) {
//         this.value = newValue;
//     }
// }
//
// const KEY = Symbol('shared-value');
//
// export function setSharedValue() {
//     return setContext(KEY, new SharedValue());
// }
//
// export function getSharedValue() {
//     return getContext<SharedValue>(KEY);
// }
//
