// import { relations } from '$lib/schema/relations';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';
import postgres from 'postgres';

if (!env.DB_USER) throw new Error('DB_USER is not set');
if (!env.DB_NAME) throw new Error('DB_NAME is not set');

const client = postgres({
    host: env.DB_HOST || '/var/run/postgresql',
    port: parseInt(env.DB_PORT || '5432'),
    user: env.DB_USER,
    password: env.DB_PASS || '',
    database: env.DB_NAME
});

// export const db = drizzle({ client: pg, relations: relations });
export const db = drizzle({ client: client });
