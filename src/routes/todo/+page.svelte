<script lang="ts">
    import OtpForm from '$bricks/forms/otp.svelte';
    import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';

    async function validate() {
        toast.info('Code validated');
        goto(resolve('/'));
    }

    async function cancel() {
        goto(resolve('/'));
    }
</script>

<span class="text-center text-xl">Not implemented yet</span>
<span class="text-center">
    This page is under construction.
    <a href={resolve('/')}>Return to main page</a>
</span>

<div class="flex flex-col items-center max-w-max space-y-4">
    <OtpForm
        title="Enter verivication code"
        description="We sent a 6-digit code to your email."
        onSubmit={{ handler: validate }}
        onCancel={{ handler: cancel }}
    />
    <p>
        Didn't receive the code? <a href="#/">Resend</a>
    </p>
</div>
