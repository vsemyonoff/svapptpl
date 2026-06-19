import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import adapter from '@sveltejs/adapter-node';

export default defineConfig(({ mode }) => {
    // Parse environment
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            sveltekit({
                compilerOptions: {
                    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                    runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
                    experimental: {
                        async: true
                    }
                },
                experimental: {
                    remoteFunctions: true
                },
                adapter: adapter(),
                typescript: {
                    config: (config) => ({
                        ...config,
                        include: [...config.include, '../drizzle.config.ts']
                    })
                }
            })
        ],
        server: {
            host: env.HOST || 'localhost',
            port: parseInt(env.PORT) || 0,
            strictPort: true // throw error if PORT is busy
        }
    };
});
