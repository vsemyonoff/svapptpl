// src/hooks.server.ts
import type { ServerInit } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { building } from '$app/environment';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const init: ServerInit = async () => {
    // Prevent initialization logic from executing during the build phase
    if (building) return;

    console.log('🚀 Server initialized. Registering shutdown hooks...');

    // Define your teardown routine
    const gracefulShutdown = async (signal: string) => {
        console.log(`🛑 Received ${signal}. Starting graceful shutdown...`);

        try {
            // Place your resource cleanups here (e.g., db.$disconnect(), redis.quit())
            // await db.disconnect();
            console.log('✅ Resources cleaned up successfully.');
        } catch (error) {
            console.error('❌ Error during resource cleanup:', error);
        }

        // Always exit the process when manually handling process signals
        process.exit(0);
    };

    // 1. PRODUCTION (adapter-node specific)
    // Supports async operations and runs after the HTTP server stops accepting requests
    process.on('sveltekit:shutdown', async (reason) => {
        await gracefulShutdown(`sveltekit:shutdown (${reason})`);
    });

    // 2. DEVELOPMENT / LOCAL FALLBACKS
    // Catches Ctrl+C in terminal and termination signals during local development
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
};

const handleAuth: Handle = async ({ event, resolve }) => {
    const session = await auth.api.getSession({ headers: event.request.headers });

    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }

    return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = sequence(handleAuth);
