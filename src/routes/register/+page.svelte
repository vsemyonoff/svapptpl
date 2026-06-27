<!--
  Registration form
-->
<script lang="ts">
    import { authClient } from '$client/auth';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    import RegisterForm from '$bricks/forms/register.svelte';
    import { toast } from 'svelte-sonner';

    let username = $state('');
    let usermail = $state('');
    let password = $state('');
    let pascheck = $state('');

    // import { onMount } from 'svelte';

    // onMount(() => {
    //     const timer = setTimeout(() => {
    //         errorMsg.update('');
    //     }, 3000);
    //
    //     // Clean up the timer if the component unmounts
    //     return () => clearTimeout(timer);
    // });

    async function register() {
        // const { data, error } = await authClient.isUsernameAvailable({
        // 	username: 'johndoe' //
        // });
        //
        // if (data?.available) {
        // 	console.log('Username can be registered!'); //
        // }

        let { error } = await authClient.signUp.email(
            {
                username: username,
                password: password,
                email: usermail,
                name: username
            },
            {
                onSuccess: async () => {
                    goto(resolve('/'));
                }
            }
        );

        if (error) {
            toast.error(`Error: ${error.message || 'unknown'}`);
        }
    }

    function cancel() {
        goto(resolve('/'));
    }
</script>

<div class="flex flex-col items-center max-w-max space-y-4">
    <RegisterForm
        title="Register"
        onSubmit={{ handler: register }}
        onCancel={{ handler: cancel }}
        bind:username
        bind:usermail
        bind:password
        bind:pascheck
    />
    <p>
        Already have an account? <a href={resolve('/login')}>Login</a>
    </p>
</div>
