<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import '$lib/assets/main.css';

    import '@drop-in/graffiti/core';
    import '@drop-in/graffiti/components';
    import '@drop-in/graffiti/layouts';
    import '@drop-in/graffiti/utilities';
    import '@drop-in/graffiti/themes';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div id="rootLayout" class="theme-soft-consumer">
    {@render children()}
</div>
