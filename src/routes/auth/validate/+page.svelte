<!--
  OTP validation form
-->
<script lang="ts">
    import OtpForm from '$bricks/forms/otp.svelte';
    import { resolve } from '$app/paths';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';

    async function validate() {
        toast.info('Code validated');
        await goto(resolve('/'));
    }
</script>

<OtpForm
    title="Enter verivication code"
    description="We sent a 6-digit code to your email."
    onSubmit={{ handler: validate }}
    onCancel={{}}
/>
<p>
    Didn't receive the code? <a href="#/">Resend</a>
</p>
