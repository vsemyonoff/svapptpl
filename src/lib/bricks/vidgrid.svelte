<script lang="ts">
    import { WRTCPlayer } from '$client/wrtcplayer.svelte';
    import * as Field from '$ui/field';
    import * as Modal from '$ui/modal';
    import { Badge } from '$ui/badge';
    import * as Card from '$ui/card';

    const { streamNames = [] }: { streamNames: string[] } = $props();

    // Dynamic Tailwind grid layout derived from current active stream count
    let gridLayout = $derived(() => {
        const count = streamNames.length;
        if (count === 1) return 'grid-cols-1 md:max-w-2xl mx-auto';
        if (count === 2) return 'grid-cols-1 md:grid-cols-2 md:max-w-4xl';
        if (count <= 4) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
        // if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6';
    });

    const streams: WRTCPlayer[] = $state([]);

    $effect(() => {
        // Remove stale streams
        for (let idx = 0; idx < streams.length; ++idx) {
            const name = streams[idx].name;
            if (!streamNames.includes(name)) {
                console.log(`removed stream ${name}`);
                streams.splice(idx, 1);
                --idx;
            }
        }

        // Append new streams
        streamNames.forEach((name) => {
            let exists = false;
            streams.forEach((stream) => {
                if (stream.name === name) {
                    exists = true;
                }
            });
            if (exists) return;

            const stream = new WRTCPlayer('mini', name);
            streams.unshift(stream);
        });
    });

    // HQ streams live player
    const hqplayer = new WRTCPlayer('live');
</script>

<!-- Overlay player -->
<Modal.Root bind:open={hqplayer.open}>
    <Modal.Content class="flex flex-col h-full w-full min-w-3/4 justify-center">
        <!-- <Modal.Header> -->
        <!--     <Modal.Title>{hqplayer.name}</Modal.Title> -->
        <!-- </Modal.Header> -->
        <Field.Field class="flex-1 justify-center h-full w-full">
            <video
                bind:this={hqplayer.ref}
                muted
                autoplay
                playsinline
                controls
                controlsList="nodownload"
                disablePictureInPicture
                class="h-full w-full rounded-xl"
            ></video>
        </Field.Field>
        <!-- <Modal.Footer /> -->
    </Modal.Content>
</Modal.Root>

<!-- Video grid view -->
<div class="grid gap-4 w-full h-fit max-h-full p-4 transition-all duration-300 {gridLayout()}">
    {#each streams.values() as stream (stream.name)}
        <Card.Root
            class="relative overflow-y-auto bg-muted aspect-video flex items-center justify-center border-2 border-border group rounded-xl"
        >
            <!-- In production, assign srcObject using an action or element reference -->
            <video
                onclick={() => {
                    hqplayer.play(stream.name);
                }}
                bind:this={stream.ref}
                muted
                autoplay
                playsinline
                disablePictureInPicture
                class="w-full h-full object-cover rounded-xl"
            ></video>

            <!-- Overlay Info UI Bar via shadcn components -->
            <div
                class="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-90 transition-opacity group-hover:opacity-100"
            >
                <Badge variant="secondary" class="bg-background/80 backdrop-blur-md px-3 py-1 font-medium shadow-sm">
                    {stream.name}
                </Badge>
            </div>
        </Card.Root>
    {/each}
</div>
