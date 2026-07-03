import type { LayoutServerLoad } from './$types';

// Disable sirver side rendering
// export const ssr = false;

import type { MenuItem } from '$bricks/appsbar.svelte';

// Menu items.
const items: MenuItem[] = [
    {
        title: 'Home',
        url: '/',
        icon: 'House'
    },
    {
        title: 'Blog',
        url: '/blog',
        icon: 'Newspaper'
    },
    {
        title: 'TODO',
        url: '/todo',
        icon: 'ListCheck'
    },
    {
        title: 'Media MTX',
        url: '/video',
        icon: 'TvMinimalPlay'
    }
];

// Server data loader
export const load: LayoutServerLoad = async ({ locals }) => {
    // Expose session/user to client
    return {
        menu: items,
        session: locals.session,
        user: locals.user
    };
};
