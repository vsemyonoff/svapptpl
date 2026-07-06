import type { LayoutServerLoad } from './$types';

// Disable sirver side rendering
// export const ssr = false;

import type { MenuItem } from '$bricks/appsbar.svelte';

// Menu items.
const items: MenuItem[] = [
    {
        title: 'Home',
        url: '/',
        icon: 'House',
        type: 'public'
    },
    {
        title: 'Blog',
        url: '/blog',
        icon: 'Newspaper',
        type: 'public'
    },
    {
        title: 'TODO',
        url: '/todo',
        icon: 'ListCheck',
        type: 'public'
    },
    {
        title: 'Media MTX',
        url: '/video',
        icon: 'TvMinimalPlay',
        type: 'private'
    }
];

const getMenu = (user: string) => {
    const menu: MenuItem[] = [];
    items.forEach((item) => {
        if (item.type === 'private' && !user) return;
        menu.push(item);
    });
    return menu;
};

// Server data loader
export const load: LayoutServerLoad = async ({ locals }) => {
    // Expose session/user to client
    return {
        menu: getMenu(locals.user?.id || ''),
        session: locals.session,
        user: locals.user
    };
};
