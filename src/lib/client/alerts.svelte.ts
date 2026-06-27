//
// src/lib/client/alerts.ts
//
import { createContext } from 'svelte';

export type Severity = 'debug' | 'info' | 'warning' | 'error';

export interface Message {
    id: number;
    message: string;
    type: Severity;
}

export class MessageBus {
    #alerts = $state<Message[]>([]);

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

export const [getMessageBus, setMessageBus] = createContext<MessageBus>();
