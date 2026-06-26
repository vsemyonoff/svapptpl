import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-node';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// const ICONS_LIB = '@lucide/svelte';

export default defineConfig(({ mode }) => {
    // Parse environment
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            sveltekit({
                compilerOptions: {
                    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                    runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
                    experimental: { async: true }
                },
                // prettier-ignore
                alias: {
                    '$src': path.resolve(__dirname, './src'),
                    '$src/*': path.resolve(__dirname, './src/*'),
                    // Assets
                    '$assets': path.resolve(__dirname, './src/lib/assets'),
                    '$assets/*': path.resolve(__dirname, './src/lib/assets/*'),
                    '$css': path.resolve(__dirname, './src/lib/assets/css'),
                    '$css/*': path.resolve(__dirname, './src/lib/assets/css/*'),
                    '$icons': path.resolve(__dirname, './src/lib/assets/icons'),
                    '$icons/*': path.resolve(__dirname, './src/lib/assets/icons/*'),
                    // UI
                    '$bricks': path.resolve(__dirname, './src/lib/bricks'),
                    '$bricks/*': path.resolve(__dirname, './src/lib/bricks/*'),
                    '$ui': path.resolve(__dirname, './src/lib/bricks/ui'),
                    '$ui/*': path.resolve(__dirname, './src/lib/bricks/ui/*'),
                    '$hooks': path.resolve(__dirname, './src/lib/bricks/hooks'),
                    '$hooks/*': path.resolve(__dirname, './src/lib/bricks/hooks/*'),
                    // Library
                    '$client': path.resolve(__dirname, './src/lib/client'),
                    '$client/*': path.resolve(__dirname, './src/lib/client/*'),
                    '$server': path.resolve(__dirname, './src/lib/server'),
                    '$server/*': path.resolve(__dirname, './src/lib/server/*'),
                },
                experimental: { remoteFunctions: true },
                adapter: adapter(),
                typescript: {
                    config: (config) => ({
                        ...config,
                        include: [...config.include, '../drizzle.config.ts']
                    })
                }
            }),
            tailwindcss()
        ],
        server: {
            host: env.HOST || 'localhost',
            port: parseInt(env.PORT) || 0,
            strictPort: true // throw error if PORT is busy
        }
    };
});
