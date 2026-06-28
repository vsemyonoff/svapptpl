import { getContext, hasContext, setContext } from 'svelte';

export type Severity = 'debug' | 'info' | 'warning' | 'error';

export interface Message {
    id: number;
    message: string;
    type: Severity;
}

export class MessageBus {
    #alerts: Message[] = $state([]);

    #removeOld(id: number, timeout: number) {
        let nextFreeIndex = 0;

        for (let i = 0; i < this.#alerts.length; i++) {
            if (id - this.#alerts[i].id >= timeout) {
                // Keep element
                if (nextFreeIndex !== i) {
                    this.#alerts[nextFreeIndex] = this.#alerts[i];
                }
                nextFreeIndex++;
            }
        }

        this.#alerts.length = nextFreeIndex;
    }

    get() {
        return this.#alerts;
    }

    notify(message: string, type: Severity, timeout = 3000) {
        const id = Date.now();
        this.#alerts.push({ id, message, type });
        setTimeout(() => {
            this.#removeOld(id, timeout);
        }, timeout);
    }
}

const CONTEXT_KEY = crypto.randomUUID();

export const useMessageBus = (): MessageBus => {
    if (!hasContext(CONTEXT_KEY)) setContext(CONTEXT_KEY, new MessageBus());
    return getContext(CONTEXT_KEY);
};
