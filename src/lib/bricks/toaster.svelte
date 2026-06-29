<script lang="ts">
    import { LoaderCircle, CircleCheckIcon, OctagonXIcon, InfoIcon, TriangleAlertIcon } from '@lucide/svelte';
    import { Toaster, type ToasterProps } from 'svelte-sonner';

    let { ...restProps }: ToasterProps = $props();
</script>

<Toaster
    position="top-right"
    offset="80px"
    toastOptions={{
        unstyled: true,
        classes: {
            toast: 'flex items-center rounded-xl bg-muted p-2 gap-2 font-mono border',
            info: 'border-blue-200 text-blue-700',
            warning: 'border-amber-200 text-amber-700',
            error: 'border-destructive text-destructive',
            success: 'border-green-200 text-green-700'
        }
    }}
    {...restProps}
>
    {#snippet loadingIcon()}
        <LoaderCircle class="size-6 animate-spin" />
    {/snippet}
    {#snippet successIcon()}
        <CircleCheckIcon class="size-6 text-green-700" />
    {/snippet}
    {#snippet errorIcon()}
        <OctagonXIcon class="size-6 text-destructive" />
    {/snippet}
    {#snippet infoIcon()}
        <InfoIcon class="size-6 text-blue-700" />
    {/snippet}
    {#snippet warningIcon()}
        <TriangleAlertIcon class="size-6 text-amber-700" />
    {/snippet}
</Toaster>
