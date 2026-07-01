<!--
  Login form
-->
<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import LoginForm from '$bricks/forms/login.svelte';
    import type { Pathname } from '$app/types';
    import { authClient } from '$client/auth';
    import { toast } from 'svelte-sonner';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    let username = $state('');
    let password = $state('');

    const redirectTo = page.url.searchParams.get('redirectTo') || '/';

    async function login() {
        await authClient.signIn.username(
            {
                username: username,
                password: password
                // callbackURL: path
            },
            {
                onSuccess: async () => {
                    goto(resolve(redirectTo as Pathname));
                    invalidateAll();
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            }
        );
    }
</script>

<LoginForm title="Login" onSubmit={{ handler: login }} onCancel={{}} bind:username bind:password />
<p>
    Don't have an account? <a href={resolve(`/auth/register?redirectTo=${encodeURIComponent(redirectTo)}`)}>Register</a>
</p>
