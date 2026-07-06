import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export async function load({ locals }) {
    if (!locals.user) {
        const redirectTo = encodeURIComponent('/admin');
        return redirect(302, resolve(`/auth?redirectTo=${redirectTo}`));
    }
}
