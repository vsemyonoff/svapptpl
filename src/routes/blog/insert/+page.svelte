<script lang="ts">
    import { insert as insertPost } from '$lib/posts.remote';
    import BaseForm from '$bricks/forms/base.svelte';
    import { Textarea } from '$ui/textarea';
    import * as Field from '$ui/field';
    import { Input } from '$ui/input';
</script>

<BaseForm {...insertPost} onSubmit={{ text: 'New post' }} onCancel={{}}>
    <Field.Field>
        <Field.Label for="title">Title</Field.Label>
        <Input id="title" {...insertPost.fields.title.as('text')} />
    </Field.Field>
    <Field.Field>
        <Field.Label for="body">Body</Field.Label>
        <Textarea id="body" {...insertPost.fields.body.as('text')} />
    </Field.Field>
</BaseForm>
