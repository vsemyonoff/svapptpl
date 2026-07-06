import { usernameClient } from 'better-auth/client/plugins';
import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/client';
import type { Pathname } from '$app/types';
import { resolve } from '$app/paths';

export const authClient = createAuthClient({
    basePath: resolve('/api/auth' as Pathname),
    plugins: [adminClient(), usernameClient()]
});
