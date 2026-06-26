<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import { cn } from '$client/utils.js';
    import { Button } from '$ui/button';
    import * as Field from '$ui/field';
    import * as Card from '$ui/card';

    interface BaseHandler {
        handler: () => void;
        text?: string;
    }

    type Props = {
        title?: string;
        description?: string;
        onSubmit: BaseHandler;
        onCancel?: BaseHandler;
    } & ComponentProps<typeof Card.Root>;

    let { class: className, title, description, onSubmit, onCancel, children, ...restProps }: Props = $props();

    function submit(e: Event) {
        e.preventDefault();
        onSubmit.handler();
    }

    function cancel(e: Event) {
        e.preventDefault();
        onCancel?.handler();
    }
</script>

<Card.Root class={cn('form-base-root', className)} {...restProps}>
    {#if title}
        <Card.Header class="form-base-header">
            <Card.Title class="form-base-title">{title}</Card.Title>
            {#if description}
                <Card.Description class="form-base-description">{description}</Card.Description>
            {/if}
        </Card.Header>
    {/if}
    <Card.Content>
        <form onsubmit={submit}>
            <Field.Group>
                {@render children?.()}
                <Field.Field class="form-base-buttons">
                    <Button class="form-base-submit" type="submit">{onSubmit.text || 'Submit'}</Button>
                    {#if onCancel}
                        <Button class="form-base-cancel" variant="outline" onclick={cancel}>
                            {onCancel.text || 'Cancel'}</Button
                        >
                    {/if}
                </Field.Field>
            </Field.Group>
        </form>
    </Card.Content>
</Card.Root>
