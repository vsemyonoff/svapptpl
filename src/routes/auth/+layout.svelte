<script lang="ts">
    let { children } = $props();
</script>

<div class="flex flex-1 justify-center w-full">
    <div class="flex flex-col items-center max-w-max space-y-4">
        {@render children?.()}
    </div>
</div>
