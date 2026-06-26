<!--
  Registration form
-->
<script lang="ts">
    // import { triggerAlert } from '$client/alerts';
    import { authClient } from '$client/auth';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    import RegisterForm from '$bricks/forms/register.svelte';

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

        await authClient.signUp.email(
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
    }

    function cancel() {
        goto(resolve('/'));
    }
</script>

<div class="flex flex-col w-full max-w-sm gap-6">
    <RegisterForm
        class="w-full max-w-sm flex-col gap-6"
        title="Register"
        onSubmit={{ handler: register }}
        onCancel={{ handler: cancel }}
        bind:username
        bind:usermail
        bind:password
        bind:pascheck
    />
    <p class="text-center">
        Already have an account? <a href={resolve('/login')}>Login</a>
    </p>
</div>

<!--
    <div class="card w-full max-w-sm flex-col gap-6 text-normal">
        <div class="card-title">
            <span class="text-xl text-center">New user registration</span>
            <span class="text-sm text-center">Create new user account</span>
        </div>
        <form class="card-content flex flex-col text-sm gap-2 p-2" onsubmit={register}>
            <label for="username">User name</label>
            <input class="input" required type="text" id="username" placeholder="" />

            <label for="email">Email</label>
            <input class="input" required type="email" id="email" placeholder="user@example.com" />

            <div class="flex flex-row gap-4">
                <div class="flex flex-col">
                    <label for="password">Password</label>
                    <input class="input" required type="password" id="password" placeholder="" />
                </div>

                <div class="flex flex-col">
                    <label for="pascheck">Confirm password</label>
                    <input class="input" required type="password" id="pascheck" placeholder="" />
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <button type="submit" class="button-primary h-9">Register</button>
                <button type="button" class="button-outline h-9" onclick={cancel}>Cancel</button>
            </div>
        </form>
    </div>
-->
