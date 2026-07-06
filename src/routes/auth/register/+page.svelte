<!--
  Registration form
-->
<script lang="ts">
    import RegisterForm from '$bricks/forms/register.svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import type { Pathname } from '$app/types';
    import { authClient } from '$client/auth';
    import { toast } from 'svelte-sonner';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    let username = $state('');
    let usermail = $state('');
    let password = $state('');
    let pascheck = $state('');

    const redirectTo = page.url.searchParams.get('redirectTo') || '/';

    async function register() {
        await authClient.signUp.email(
            {
                username: username,
                password: password,
                email: usermail,
                name: username
                // callbackURL: redirectTo
            },
            {
                onSuccess: async () => {
                    console.log(`registration success, redirecting to : ${redirectTo}`);
                    await goto(resolve(redirectTo as Pathname));
                    invalidateAll();
                },
                onError: async (ctx) => {
                    toast.error(`Error: ${ctx.error.message || 'unknown'}`);
                }
            }
        );
    }
</script>

<RegisterForm
    title="New user"
    onSubmit={{ handler: register }}
    onCancel={{}}
    bind:username
    bind:usermail
    bind:password
    bind:pascheck
/>
<p>
    Already have an account? <a href={resolve(`/auth?redirectTo=${encodeURIComponent(redirectTo)}`)}>Login</a>
</p>
