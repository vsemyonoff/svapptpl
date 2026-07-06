<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { usePrevPage } from '$client/prevpage.svelte';
    import { goto } from '$app/navigation';
    import { cn } from '$client/utils.js';
    import { resolve } from '$app/paths';
    import { Button } from '$ui/button';
    import * as Field from '$ui/field';
    import * as Card from '$ui/card';

    interface BaseHandler {
        handler?: (e: Event) => Promise<void>;
        text?: string;
    }

    type Props = {
        title?: string;
        description?: string;
        onSubmit: BaseHandler;
        onCancel?: BaseHandler;
    } & HTMLAttributes<HTMLFormElement>;

    async function submit(e: Event) {
        e.preventDefault();
        await onSubmit.handler?.(e);
    }

    const prevPage = usePrevPage();

    async function cancel(e: Event) {
        e.preventDefault();
        if (!onCancel?.handler) {
            await goto(resolve(prevPage.path));
            return;
        }
        await onCancel.handler?.(e);
    }

    const id = $props.id();
    const formId = `form-${id}`;

    function onKeyPress(e: KeyboardEvent) {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (e.key === 'Enter' || e.key === 'Return') {
            if (onSubmit.handler) {
                e.preventDefault();
                form.requestSubmit();
            }
        }
        if (e.key === 'Escape') {
            form.reset();
        }
        return e;
    }

    let { class: className, title, description, onSubmit, onCancel, children, ...restProps }: Props = $props();
</script>

<svelte:window onkeydown={onKeyPress} />

<Card.Root class={cn('form-base-root', className)}>
    {#if title}
        <Card.Header class="form-base-header">
            <Card.Title class="form-base-title">{title}</Card.Title>
            {#if description}
                <Card.Description class="form-base-description">{description}</Card.Description>
            {/if}
        </Card.Header>
    {/if}
    <Card.Content class="form-base-content">
        <form id={formId} class="form-base-content" onsubmit={submit} {...restProps}>
            <Field.Group class="form-base-content">
                {@render children?.()}
                <Field.Field class="form-base-buttons">
                    <Button class="base-button form-base-submit" type="submit">{onSubmit.text || 'Submit'}</Button>
                    {#if onCancel}
                        <Button class="base-button form-base-cancel" variant="outline" onclick={cancel}>
                            {onCancel.text || 'Cancel'}</Button
                        >
                    {/if}
                </Field.Field>
            </Field.Group>
        </form>
    </Card.Content>
</Card.Root>
