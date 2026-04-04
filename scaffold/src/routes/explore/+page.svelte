<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
	let selectedTag = $state<string | null>(null);

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}

	let popularPosts = $derived(
		[...data.posts]
			.filter((p) => p.parentId === null)
			.sort((a, b) => b.likeCount + b.repostCount - (a.likeCount + a.repostCount))
			.slice(0, 5)
	);

	let filteredPosts = $derived(
		selectedTag
			? data.posts.filter((p) => p.tags.includes(selectedTag!))
			: []
	);
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-bold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2" data-test="trending-tags">
	{#each data.tags as tag}
		<button
			class="rounded bg-gray-100 px-2 py-1 text-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 {selectedTag === tag.name ? 'ring-2 ring-blue-500' : ''}"
			data-test="tag"
			onclick={() => (selectedTag = selectedTag === tag.name ? null : tag.name)}
		>
			#{tag.name} <span class="text-gray-400">({tag.postCount})</span>
		</button>
	{/each}
</div>

{#if selectedTag}
	<div data-test="filtered-posts">
		<h2 class="mb-2 font-bold">Posts tagged #{selectedTag}</h2>
		{#each filteredPosts as post (post.id)}
			<PostCard {post} author={getAuthor(post.authorId)} />
		{/each}
	</div>
{/if}

<h2 class="mb-2 font-bold">Suggested Users</h2>
<div class="mb-6" data-test="suggested-users">
	{#each data.users.slice(0, 5) as user}
		<div class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="/profile/{user.handle}" class="font-medium">{user.displayName}</a>
			<span class="text-sm text-gray-500 dark:text-gray-400">@{user.handle}</span>
			<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
		</div>
	{/each}
</div>

<h2 class="mb-2 font-bold">Popular Posts</h2>
<div data-test="popular-posts">
	{#each popularPosts as post (post.id)}
		<PostCard {post} author={getAuthor(post.authorId)} />
	{/each}
</div>
