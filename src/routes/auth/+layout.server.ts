import { redirect } from '@sveltejs/kit';
// import type { Actions } from './$types';
// import type { PageServerLoad } from './$types';
// import { auth } from '$lib/server/auth';

export async function load({ locals }) {
    if (locals.user) {
        return redirect(302, '/');
    }
}
//
// export const actions: Actions = {
// 	signOut: async (event) => {
// 		await auth.api.signOut({
// 			headers: event.request.headers
// 		});
// 		return redirect(302, '/demo/better-auth/login');
// 	}
// };
