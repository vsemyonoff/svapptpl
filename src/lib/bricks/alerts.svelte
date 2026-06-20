<script>
    import { alerts } from '$lib/common';
</script>

<div id="alerts">
    {#each $alerts as alert (alert.id)}
        <div class="callout {alert.type} fill">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </svg>
            <p>{alert.message}</p>
        </div>
    {/each}
</div>
