<!--
  Login form
-->
<script lang="ts">
    import { authClient } from '$common/auth';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    async function login(e: Event) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;

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

    async function cancel(e: Event) {
        e.preventDefault();

        goto(resolve('/'));
    }
</script>

<h4 class="">Login</h4>
<form class="stack" onsubmit={login}>
    <label for="username">Username:</label>
    <input type="text" id="username" placeholder="" />

    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="" />

    <div class="split">
        <label class="form-option-row"><input type="checkbox" /> Remember me</label>
        <a href={resolve('/todo')}>Forgot password?</a>
    </div>

    <div class="form-actions">
        <button type="submit" class="primary">Login</button>
        <button type="button" class="ghost" onclick={cancel}>Cancel</button>
    </div>

    <p class="fs-xs" style="text-align: center; color: var(--fg-5);">
        Don't have an account? <a href={resolve('/register')}>Register</a>
    </p>
</form>
