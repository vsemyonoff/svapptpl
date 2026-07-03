<script lang="ts">
    import { index } from '$remote/post/api.remote';
</script>

<ol class="list-[decimal-leading-zero] list-inside space-y-2">
    {#each await index() as post (post.id)}
        <li>{post.title}</li>
    {/each}
</ol>
