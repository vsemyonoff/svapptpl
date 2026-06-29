<!--
  Login form
-->
<script lang="ts">
    import { authClient } from '$client/auth';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    import LoginForm from '$bricks/forms/login.svelte';
    import { toast } from 'svelte-sonner';

    let username = $state('');
    let password = $state('');

    async function login() {
        let { error } = await authClient.signIn.username(
            {
                username: username,
                password: password
            },
            {
                onSuccess: async () => {
                    goto(resolve('/'));
                }
            }
        );

        if (error) {
            toast.error(`Error: ${error.message || 'unknown error'}`);
        }
    }
</script>

<LoginForm title="Login" onSubmit={{ handler: login }} onCancel={{}} bind:username bind:password />
<p>
    Don't have an account? <a href={resolve('/auth/register')}>Register</a>
</p>
