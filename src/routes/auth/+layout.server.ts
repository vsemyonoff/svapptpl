import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export async function load({ locals }) {
    if (locals.user) {
        return redirect(302, resolve('/'));
    }
}
