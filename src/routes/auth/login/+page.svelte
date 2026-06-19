<!--
  Login Form UI Block
-->
<script lang="ts">
    // import { authClient } from '$lib/auth.client';

    function login(e: Event) {
        e.preventDefault();
    }
</script>

<h4 class="">Login</h4>
<form method="post" class="stack" onsubmit={login}>
    <label for="login-email">Email</label>
    <input type="email" id="login-email" placeholder="you@example.com" />

    <label for="login-password">Password</label>
    <input type="password" id="login-password" placeholder="Enter your password" />

    <div class="split">
        <label class="form-option-row"><input type="checkbox" /> Remember me</label>
        <a href="#forgot">Forgot password?</a>
    </div>

    <button type="submit" class="primary">Login</button>

    <p class="fs-xs" style="text-align: center; color: var(--fg-5);">
        Don't have an account? <a href="#register">Register</a>
    </p>
</form>
