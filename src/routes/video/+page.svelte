<!-- +page.svelte -->
<script lang="ts">
    import { index as streamsIndex } from '$remote/video/api.remote';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import VideoGrid from '$bricks/vidgrid.svelte';

    let live = $state(true);

    afterNavigate(() => {
        live = true;
    });

    beforeNavigate(() => {
        live = false;
    });

    const streamsUpdatePromise = $derived.by(async () => {
        const sync = $state.snapshot(live);
        return await streamsIndex({ live: sync, timeout: 1000 });
    });

    const streamsUpdate = $derived(await streamsUpdatePromise);

    let streamNames: string[] = $derived.by(() => {
        const activeStreams: string[] = [];
        streamsUpdate.forEach((stream) => {
            activeStreams.unshift(stream.name);
        });
        return activeStreams;
    });
</script>

{#snippet failed()}
    <p>fallback</p>
{/snippet}

<div class="flex flex-col h-full max-f-full bg-background text-foreground">
    <!-- Video Feed Grid Area -->
    <div class="flex flex-1 bg-default items-start justify-center overflow-y-auto">
        <svelte:boundary {failed}>
            <VideoGrid {streamNames} />
        </svelte:boundary>
    </div>
</div>
