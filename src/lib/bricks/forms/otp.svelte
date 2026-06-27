<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import FormBase from './base.svelte';
    import * as InputOTP from '$ui/input-otp';
    import * as Field from '$ui/field';

    type Props = {
        username?: string;
        password?: string;
    } & ComponentProps<typeof FormBase>;

    function reset(pass?: boolean) {
        // TODO
        console.log(pass);
    }

    function validate() {
        onSubmit.handler();
        reset();
    }

    function cancel() {
        onCancel?.handler();
        reset();
    }

    let { onSubmit, onCancel, ...restProps }: Props = $props();
</script>

<FormBase
    onSubmit={{ handler: validate, text: onSubmit.text || 'Verify' }}
    onCancel={onCancel ? { handler: cancel, text: onCancel.text || 'Cancel' } : undefined}
    {...restProps}
>
    <Field.Field>
        <Field.Label for="otp" class="sr-only">Verification code</Field.Label>
        <InputOTP.Root class="flex justify-center" maxlength={6} id="otp" required>
            {#snippet children({ cells })}
                <InputOTP.Group
                    class="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border"
                >
                    {#each cells as cell (cell)}
                        <InputOTP.Slot {cell} />
                    {/each}
                </InputOTP.Group>
            {/snippet}
        </InputOTP.Root>
        <Field.Description class="text-center">Enter the 6-digit code sent to your email.</Field.Description>
    </Field.Field>
</FormBase>
