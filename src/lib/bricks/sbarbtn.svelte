<script lang="ts">
    import { PanelLeftIcon } from '@lucide/svelte';
    import type { ComponentProps } from 'svelte';
    import { useSidebar } from '$ui/sidebar';
    import { Button } from '$ui/button';
    import { cn } from '$client/utils';

    type Props = {
        onClick?: () => void;
    } & ComponentProps<typeof Button>;

    let { ref = $bindable(null), onClick, class: className, children, ...restProps }: Props = $props();

    const sidebar = useSidebar();
</script>

<Button
    bind:ref
    variant="ghost"
    size="icon"
    class={cn('', className)}
    type="button"
    onclick={() => {
        sidebar.toggle();
        onClick?.();
    }}
    {...restProps}
>
    <PanelLeftIcon class="icon-default" />
    {@render children?.()}
</Button>
