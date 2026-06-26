<!--
  Login form
-->
<script lang="ts">
    import { authClient } from '$client/auth';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    import LoginForm from '$bricks/forms/login.svelte';

    let username = $state('');
    let password = $state('');

    async function login() {
        await authClient.signIn.username(
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
    }

    async function cancel() {
        goto(resolve('/'));
    }
</script>

<div class="flex flex-col w-full max-w-sm gap-6">
    <LoginForm
        class="w-full max-w-sm flex-col gap-6"
        title="Login"
        onSubmit={{ handler: login }}
        onCancel={{ handler: cancel }}
        bind:username
        bind:password
    />
    <p class="text-center">
        Don't have an account? <a href={resolve('/register')}>Register</a>
    </p>
</div>
