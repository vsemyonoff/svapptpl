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
        constraint?: number;
    } & ComponentProps<typeof FormBase>;

    function reset(pass?: boolean) {
        password = '';
        pascheck = '';
        if (pass) return;
        username = '';
        usermail = '';
    }

    function register() {
        if (password !== pascheck) {
            toast.error("Passwords don't match");
            reset(true);
            return;
        }

        if (password.length < constraint) {
            toast.error('Password too short');
            reset(true);
            return;
        }

        onSubmit.handler();
        reset();
    }

    function cancel() {
        onCancel?.handler();
        reset();
    }

    let {
        username = $bindable(''),
        usermail = $bindable(''),
        password = $bindable(''),
        pascheck = $bindable(''),
        constraint = 8,
        onSubmit,
        onCancel,
        ...restProps
    }: Props = $props();
</script>

<FormBase
    onSubmit={{ handler: register, text: onSubmit.text || 'Register' }}
    onCancel={onCancel ? { handler: cancel, text: onCancel.text || 'Cancel' } : undefined}
    {...restProps}
>
    <Field.Field>
        <Field.Label for="name">User name</Field.Label>
        <Input bind:value={username} id="name" type="text" placeholder="" required />
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
        <Field.Description>Must be at least {constraint} characters long.</Field.Description>
    </Field.Field>
</FormBase>
