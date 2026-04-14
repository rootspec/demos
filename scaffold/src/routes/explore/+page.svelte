<script lang="ts">
	let { data } = $props();

	let activeTag = $state<string | null>(null);

	let filteredPosts = $derived(
		activeTag
			? data.posts.filter((p: { tags: string[] }) => p.tags.includes(activeTag!))
			: data.posts
	);

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? null : tagName;
	}

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-semibold">Trending Tags</h2>
<div data-test="trending-tags" class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<button
			data-test="tag-chip"
			data-active={activeTag === tag.name}
			onclick={() => toggleTag(tag.name)}
			class="rounded-full px-3 py-1 text-sm transition-colors {activeTag === tag.name
				? 'bg-blue-600 text-white'
				: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'}"
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

<h2 class="mb-2 font-semibold">Suggested People</h2>
<div data-test="suggested-people" class="mb-6">
	{#each data.users as user}
		<div data-test="user-card" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="/demos/scaffold/profile/{user.handle}" class="font-medium hover:underline">{user.displayName}</a>
			<span class="ml-1 text-sm text-gray-500 dark:text-gray-400">@{user.handle}</span>
			<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
		</div>
	{/each}
</div>

{#if activeTag}
	<h2 class="mb-2 font-semibold">Posts tagged #{activeTag}</h2>
{:else}
	<h2 class="mb-2 font-semibold">All Posts</h2>
{/if}
<div>
	{#each filteredPosts as post}
		{@const author = getAuthor(post.authorId)}
		<div data-test="explore-post-item" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
				<a href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			</div>
			<a href="/demos/scaffold/post/{post.id}" class="block text-sm">{post.content}</a>
		</div>
	{/each}
</div>
