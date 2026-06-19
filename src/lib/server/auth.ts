import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
// import { username } from 'better-auth/plugins';
import { admin } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';

export const auth = betterAuth({
    secret: env.AUTH_TOKEN,
    baseURL: env.AUTH_URL,
    emailAndPassword: { enabled: true },
    // user: {
    // 	additionalFields: {
    // 		username: {
    // 			type: 'string',
    // 			required: true
    // 		}
    // 	}
    // },
    database: drizzleAdapter(db, { provider: 'pg' }),
    plugins: [
        admin(),
        // username(),
        sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ]
});
