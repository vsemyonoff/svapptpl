import type { Pathname } from '$app/types';
import { createContext } from 'svelte';

class PrevPage {
    #pages: Pathname[] = $state([]);
    #isBack = false;

    constructor() {
        setContext(this);
    }

    set path(page: string) {
        if (this.#isBack) {
            this.#isBack = false;
            return;
        }

        // 10 pages history
        if (this.#pages.length >= 10) {
            this.#pages.shift();
        }

        this.#pages.push(page as Pathname);
    }

    get path(): Pathname {
        const page = this.#pages.pop();
        this.#isBack = true;
        return page || '/';
    }
}

const [usePrevPage, setContext] = createContext<PrevPage>();

export { PrevPage, usePrevPage };
