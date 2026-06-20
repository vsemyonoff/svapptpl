// src/lib/common/alerts.ts

import { writable } from 'svelte/store';

export const alerts = writable([]);

export const triggerAlert = (message: string, type = 'info', timeout = 3000) => {
    const id = Date.now();
    alerts.update((all) => [...all, { id, message, type }]);

    setTimeout(() => {
        alerts.update((all) => all.filter((t) => t.id !== id));
    }, timeout);
};
