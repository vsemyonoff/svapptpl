<!--
  Registration form
-->
<script lang="ts">
    import { triggerAlert } from '$common/alerts';
    import { authClient } from '$common/auth';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    // import { onMount } from 'svelte';

    // onMount(() => {
    //     const timer = setTimeout(() => {
    //         errorMsg.update('');
    //     }, 3000);
    //
    //     // Clean up the timer if the component unmounts
    //     return () => clearTimeout(timer);
    // });

    async function register(e: Event) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;
        const pascheck = form.pascheck.value;
        const email = form.email.value;

        if (password !== pascheck) {
            triggerAlert('Passwords do not match', 'error');
            form.password.value = '';
            form.pascheck.value = '';
            return;
        }

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
                email: email,
                name: username
            },
            {
                onSuccess: async () => {
                    goto(resolve('/'));
                }
            }
        );
    }

    async function cancel(e: Event) {
        e.preventDefault();

        goto(resolve('/'));
    }
</script>

<h4 class="">New user registration</h4>
<form class="stack" onsubmit={register}>
    <label for="username">Username:</label>
    <input required type="text" id="username" placeholder="new account name" />

    <label for="email">Email:</label>
    <input required type="email" id="email" placeholder="you@example.com" />

    <label for="password">Password:</label>
    <input required type="password" id="password" placeholder="new password" />

    <label for="pascheck">Password confirm:</label>
    <input required type="password" id="pascheck" placeholder="repeat new password" />

    <div class="form-actions">
        <button type="submit" class="primary">Register</button>
        <button type="button" class="ghost" onclick={cancel}>Cancel</button>
    </div>
</form>
