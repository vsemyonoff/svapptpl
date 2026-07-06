import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import * as authSchema from '$lib/schema/auth.schema';
import { username } from 'better-auth/plugins';
import { getRequestEvent } from '$app/server';
import { admin } from 'better-auth/plugins';
import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth';
import { db } from '$lib/server/db';

export const authServer = betterAuth({
    baseURL: `${env.AUTH_PROT || env.PROT}://${env.AUTH_HOST || env.HOST}:${env.AUTH_PORT || env.PORT}`,
    secret: env.AUTH_TOKEN,
    user: {
        additionalFields: {
            username: {
                type: 'string',
                required: true
            }
        }
    },
    emailAndPassword: { enabled: true },
    database: drizzleAdapter(db, { provider: 'pg', schema: authSchema }),
    // disabledPaths: ['/is-username-available'],
    plugins: [
        admin(),
        username({ minUsernameLength: 5 }),
        sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ]
});
