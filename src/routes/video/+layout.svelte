<script lang="ts">
    import { onMount } from 'svelte';

    let e = $state(false);
    let m = $state(null);

    onMount(async () => {
        if (m) return;

        const MODULE_URL = 'https://cdn.jsdelivr.net/gh/bluenviron/mediamtx/internal/servers/webrtc/reader.js';
        try {
            m = await import(/* @vite-ignore */ MODULE_URL);
        } catch {
            e = true;
        }
    });

    let { children } = $props();
</script>

{#if e}
    <p>Failed to load the external library</p>
{:else if m}
    {@render children()}
{:else}
    <p>Loading external library...</p>
{/if}
