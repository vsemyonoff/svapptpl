<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import FormBase from './base.svelte';
    import * as Field from '$ui/field';
    import { Input } from '$ui/input';

    type Props = {
        username: string;
        password: string;
    } & ComponentProps<typeof FormBase>;

    let { username = $bindable(''), password = $bindable(''), onSubmit, onCancel, ...restProps }: Props = $props();
</script>

<FormBase
    onSubmit={{ handler: onSubmit.handler, text: onSubmit.text || 'Login' }}
    onCancel={onCancel ? { handler: onCancel.handler, text: onCancel.text || 'Cancel' } : undefined}
    {...restProps}
>
    <Field.Field>
        <Field.Label for="name">User name</Field.Label>
        <Input bind:value={username} id="name" type="text" autocapitalize="none" required />
    </Field.Field>

    <Field.Field>
        <div class="flex items-center">
            <Field.Label for="password">Password</Field.Label>
            <a href="##" class="ms-auto text-sm underline-offset-4 hover:underline"> Forgot your password? </a>
        </div>
        <Input bind:value={password} id="password" type="password" required />
    </Field.Field>
</FormBase>
