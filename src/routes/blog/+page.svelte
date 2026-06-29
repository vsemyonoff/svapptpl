<script lang="ts">
    import { index } from '$lib/posts.remote';

    // const posts = await index();
</script>

<ol>
    {#each await index() as post (post.id)}
        <li>{post.title}</li>
    {/each}
</ol>
