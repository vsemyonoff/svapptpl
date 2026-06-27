<script lang="ts">
    import { resolve } from '$app/paths';
</script>

<div class="flex flex-col items-center max-w-max space-y-4">
    <p class="text-xl">Welcome to SvelteKit</p>
    <p>
        Go to <a href={resolve('/login')}>Login</a> page or visit
        <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
    </p>
</div>
