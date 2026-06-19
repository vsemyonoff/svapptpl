<script lang="ts">
    import { authClient } from '$lib/auth.client';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    let error = $state('');

    async function register(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const login = form.login.value;
        const email = form.email.value;
        const pass0 = form.pass0.value;
        const pass1 = form.pass1.value;

        if (pass0 !== pass1) {
            error = 'Passwords do not match';
            return;
        }
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        async function clearError() {
            await sleep(1000); // Pause execution for 1000 milliseconds (1 second)
            error = '';
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
                password: pass0,
                email: email,
                name: login
                // username: login
            },
            {
                onSuccess: async () => {
                    goto(resolve('/'));
                }
            }
        );
    }
</script>

<h4 class="">New user registration</h4>
<form class="stack" onsubmit={register}>
    <label for="login">Login:</label>
    <input required type="text" id="login" placeholder="new account name" />

    <label for="email">Email:</label>
    <input required type="email" id="email" placeholder="you@example.com" />

    <label for="pass0">Password:</label>
    <input required type="password" id="pass0" placeholder="new password" />

    <label for="pass1">Password confirm:</label>
    <input required type="password" id="pass1" placeholder="repeat new password" />

    {#if error}
        <div class="callout error fill">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
            >
            <p>{error}</p>
        </div>
    {/if}

    <div class="form-actions">
        <button type="submit" class="primary">Register</button>
        <button type="button" class="ghost">Cancel</button>
    </div>
</form>
