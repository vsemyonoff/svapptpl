import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        const redirectTo = encodeURIComponent('/admin');
        return redirect(302, `/auth?redirectTo=${redirectTo}`);
    }
}
