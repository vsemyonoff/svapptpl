<script lang="ts">
    import { PanelLeftIcon } from '@lucide/svelte';
    import type { ComponentProps } from 'svelte';
    import { useSidebar } from '$ui/sidebar';
    import { Button } from '$ui/button';
    import { cn } from '$client/utils';

    let { ref = $bindable(null), class: className, children, ...restProps }: ComponentProps<typeof Button> = $props();

    const sidebar = useSidebar();
</script>

<Button
    bind:ref
    variant="ghost"
    size="icon"
    class={cn('flex flex-col gap-1 h-full flex-1', className)}
    type="button"
    onclick={() => {
        sidebar.toggle();
    }}
    {...restProps}
>
    <PanelLeftIcon class="icon-default" />
    {@render children?.()}
</Button>
