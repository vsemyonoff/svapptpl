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

    async function cancel() {
        goto(resolve('/'));
    }
</script>

<div class="flex flex-col items-center max-w-max space-y-4">
    <LoginForm title="Login" onSubmit={{ handler: login }} onCancel={{ handler: cancel }} bind:username bind:password />
    <p>
        Don't have an account? <a href={resolve('/register')}>Register</a>
    </p>
</div>
