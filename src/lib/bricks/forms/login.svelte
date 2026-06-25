<script lang="ts" module>
    import { type BaseProps } from './base.svelte';

    export type RegisterProps = {
        username: string;
        password: string;
    } & BaseProps;
</script>

<script lang="ts">
    import FormBase from './base.svelte';
    import * as Field from '$ui/field';
    import { Input } from '$ui/input';

    function reset(pass?: boolean) {
        password = '';
        if (pass) return;
        username = '';
    }

    function login() {
        onSubmit.handler();
        reset();
    }

    function cancel() {
        onCancel?.handler();
    }

    let {
        username = $bindable(''),
        password = $bindable(''),
        onSubmit,
        onCancel,
        ...restProps
    }: RegisterProps = $props();
</script>

<FormBase
    onSubmit={{ handler: login, text: onSubmit.text || 'Login' }}
    onCancel={onCancel ? { handler: cancel, text: onCancel.text || 'Cancel' } : undefined}
    {...restProps}
>
    <Field.Field>
        <Field.Label for="name">User name</Field.Label>
        <Input bind:value={username} id="name" type="text" placeholder="" required />
    </Field.Field>

    <Field.Field>
        <div class="flex items-center">
            <Field.Label for="password">Password</Field.Label>
            <a href="##" class="ms-auto text-sm underline-offset-4 hover:underline"> Forgot your password? </a>
        </div>
        <Input bind:value={password} id="password" type="password" required />
    </Field.Field>
</FormBase>
