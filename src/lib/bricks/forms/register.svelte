<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import { toast } from 'svelte-sonner';
    import FormBase from './base.svelte';
    import * as Field from '$ui/field';
    import { Input } from '$ui/input';

    type Props = {
        username: string;
        usermail: string;
        password: string;
        pascheck: string;
        pasminlen?: number;
    } & ComponentProps<typeof FormBase>;

    function reset(pass?: boolean) {
        password = '';
        pascheck = '';
        if (pass) return;
        username = '';
        usermail = '';
    }

    async function register(e: Event) {
        if (password !== pascheck) {
            toast.error("Passwords don't match");
            reset(true);
            return;
        }

        if (password.length < pasminlen) {
            toast.error('Password too short');
            reset(true);
            return;
        }

        await onSubmit.handler?.(e);
    }

    let {
        username = $bindable(''),
        usermail = $bindable(''),
        password = $bindable(''),
        pascheck = $bindable(''),
        pasminlen = 8,
        onSubmit,
        onCancel,
        ...restProps
    }: Props = $props();
</script>

<FormBase
    onSubmit={{ handler: register, text: onSubmit.text || 'Register' }}
    onCancel={onCancel ? { handler: onCancel.handler, text: onCancel.text || 'Cancel' } : undefined}
    {...restProps}
>
    <Field.Field>
        <Field.Label for="name">User name</Field.Label>
        <Input bind:value={username} id="name" type="text" autocapitalize="none" required />
        <Field.Description>Must be at least 5 characters long.</Field.Description>
    </Field.Field>

    <Field.Field>
        <Field.Label for="email">Email</Field.Label>
        <Input bind:value={usermail} id="email" type="email" placeholder="user@example.com" required />
    </Field.Field>

    <Field.Field>
        <Field.Field class="form-register-password">
            <Field.Field>
                <Field.Label for="password">Password</Field.Label>
                <Input bind:value={password} id="password" type="password" required />
            </Field.Field>
            <Field.Field>
                <Field.Label for="confirm-password">Confirm password</Field.Label>
                <Input bind:value={pascheck} id="confirm-password" type="password" required />
            </Field.Field>
        </Field.Field>
        <Field.Description>Must be at least {pasminlen} characters long.</Field.Description>
    </Field.Field>
</FormBase>
