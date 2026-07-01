import type { LayoutServerLoad } from './$types';

// Disable sirver side rendering
// export const ssr = false;

// Server data loader
export const load: LayoutServerLoad = async ({ locals }) => {
    // Expose session/user to client
    return {
        session: locals.session,
        user: locals.user
    };
};
