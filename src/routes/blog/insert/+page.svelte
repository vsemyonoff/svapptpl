<script lang="ts">
    import { insertSchema as postInsertSchema } from '$remote/post/api.schema';
    import { insert as insertPost } from '$remote/post/api.remote';
    import BaseForm from '$bricks/forms/base.svelte';
    import { Textarea } from '$ui/textarea';
    import * as Field from '$ui/field';
    import { Input } from '$ui/input';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { toast } from 'svelte-sonner';

    type SubmitRemoteFunction = Parameters<typeof insertPost.enhance>[0];

    const onSubmit: SubmitRemoteFunction = async (form) => {
        try {
            if (await form.submit()) {
                form.element.reset();
                await goto(resolve('/blog'));
            } else {
                console.log('invalid data');
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    $effect(() => {
        insertPost.fields
            .allIssues()
            ?.toReversed()
            .forEach((issue) => {
                toast.error(issue.message);
            });
    });

    let postTitle = $state('');
</script>

<div class="flex flex-1 justify-center">
    <BaseForm
        class="max-w-2/3"
        title={postTitle}
        description="Create new blog post"
        onSubmit={{ text: 'Create' }}
        onCancel={{}}
        {...insertPost.preflight(postInsertSchema).enhance(onSubmit)}
    >
        <Field.Field>
            <Field.Label for="title-01">Title</Field.Label>
            <Input bind:value={postTitle} id="title-01" />
            <input {...insertPost.fields.title.as('text')} type="hidden" value={postTitle} />
        </Field.Field>
        <Field.Field class="h-full">
            <Field.Label for="body">Body</Field.Label>
            <Textarea id="body" class="h-full" {...insertPost.fields.body.as('text')} />
        </Field.Field>
    </BaseForm>
</div>
