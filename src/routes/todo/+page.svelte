<script lang="ts">
    import OtpForm from '$bricks/forms/otp.svelte';
    import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';

    async function validate() {
        alert('Vlidate OTP');
        goto(resolve('/'));
    }

    async function cancel() {
        goto(resolve('/'));
    }
</script>

<h4>Not implemented yet</h4>
<p class="fs-xs" style="text-align: center; color: var(--fg-5);">
    This page is under construction.
    <a href={resolve('/')}>Return to main page</a>
</p>

<div class="flex flex-col w-full max-w-sm gap-6">
    <OtpForm
        class="w-full max-w-sm flex-col gap-6"
        title="Enter verivication code"
        description="We sent a 6-digit code to your email."
        onSubmit={{ handler: validate }}
        onCancel={{ handler: cancel }}
    />
    <p class="text-center">
        Didn't receive the code? <a href="#/">Resend</a>
    </p>
</div>
