import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// import { sveltekitCookies } from 'better-auth/svelte-kit';
// import { getRequestEvent } from '$app/server';
import { username } from 'better-auth/plugins';
import { admin } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';

export const auth = betterAuth({
    secret: env.AUTH_TOKEN,
    baseURL: env.AUTH_URL,
    emailAndPassword: { enabled: true },
    // user: {
    //     additionalFields: {
    //         username: {
    //             type: 'string',
    //             required: true
    //         }
    //     }
    // },
    database: drizzleAdapter(db, { provider: 'pg' }),
    disabledPaths: ['/is-username-available'],
    plugins: [
        admin(),
        username({ minUsernameLength: 5 })
        // sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ]
});
