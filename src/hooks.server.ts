import { svelteKitHandler } from 'better-auth/svelte-kit';
import type { ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { authServer } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { db } from '$db/default';

export const init: ServerInit = async () => {
    if (building) return;

    console.log('🚀 Server initialized. Registering shutdown hooks...');

    let exiting = false;
    let errorCode = 0;

    const gracefulShutdown = async (signal: string) => {
        if (exiting) return;
        exiting = true;

        console.log(`🛑 Received ${signal}. Starting graceful shutdown...`);

        try {
            if (db.$client) {
                console.log(
                    `ℹ️ Closing database connection: ${db.$client.options.database}@${db.$client.options.host}`
                );
                await db.$client.end();
            }

            console.log('✅ Resources cleaned up successfully.');
        } catch (error) {
            errorCode = 1;

            console.error('❌ Error during resource cleanup:', error);
        }

        process.exit(errorCode);
    };

    process.on('sveltekit:shutdown', async (reason) => {
        await gracefulShutdown(`sveltekit:shutdown (${reason})`);
    });
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
};

const handleAuth: Handle = async ({ event, resolve }) => {
    const session = await authServer.api.getSession({ headers: event.request.headers });

    if (session) {
        event.locals.session = session.session;
        event.locals.user = session.user;
    }

    return svelteKitHandler({ event, resolve, auth: authServer, building });
};

export const handle: Handle = sequence(handleAuth);
