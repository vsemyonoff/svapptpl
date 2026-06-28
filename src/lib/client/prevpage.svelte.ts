import { getContext, hasContext, setContext } from 'svelte';
import { v4 as uuidv4 } from 'uuid';

class PrevPage {
    #pages: string[] = $state([]);
    #isBack = false;

    set(page: string) {
        if (this.#isBack) {
            this.#isBack = false;
            return;
        }

        // 10 pages history
        if (this.#pages.length >= 10) {
            this.#pages.shift();
        }
        this.#pages.push(page);
    }

    get() {
        const page = this.#pages.pop();
        this.#isBack = true;
        return page || '/';
    }
}

const CONTEXT_KEY = uuidv4();

export const usePrevPage = (): PrevPage => {
    if (!hasContext(CONTEXT_KEY)) setContext(CONTEXT_KEY, new PrevPage());
    return getContext(CONTEXT_KEY);
};
