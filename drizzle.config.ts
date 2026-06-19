import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_USER) throw new Error('DB_USER is not set');
if (!process.env.DB_NAME) throw new Error('DB_NAME is not set');

export default defineConfig({
    schema: './src/lib/server/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.DB_HOST || '/var/run/postgresql',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER,
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME
    },
    verbose: true,
    strict: true
});
