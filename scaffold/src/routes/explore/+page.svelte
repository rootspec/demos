<script lang="ts">
	let { data } = $props();

	let activeTag = $state<string | null>(null);

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? null : tagName;
	}

	let popularPosts = $derived(
		activeTag
			? data.posts.filter((p: { tags?: string[] }) => p.tags?.includes(activeTag!))
			: data.posts.slice(0, 5)
	);
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<!-- Trending Tags -->
<h2 class="mb-2 font-semibold">Trending Tags</h2>
<div data-test="trending-tags" class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<button
			data-test="tag-chip"
			data-active={activeTag === tag.name ? 'true' : 'false'}
			onclick={() => toggleTag(tag.name)}
			class="rounded px-2 py-1 text-sm {activeTag === tag.name ? 'active bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}"
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

<!-- Suggested Users -->
<h2 class="mb-2 font-semibold">Suggested People</h2>
<div data-test="suggested-users" class="mb-6">
	{#each data.users as user}
		<div class="flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-700">
			<div>
				<a href="/demos/scaffold/profile/{user.handle}" class="font-medium">{user.displayName}</a>
				<span class="ml-1 text-sm text-gray-500">@{user.handle}</span>
				<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
			</div>
		</div>
	{/each}
</div>

<!-- Popular Posts -->
<h2 class="mb-2 font-semibold">{activeTag ? `Posts tagged #${activeTag}` : 'Popular Posts'}</h2>
<div data-test="popular-posts">
	{#each popularPosts as post}
		<div class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="/demos/scaffold/post/{post.id}" class="block hover:underline">
				<p class="text-sm">{post.content}</p>
			</a>
			<p class="mt-1 text-xs text-gray-400">{post.likeCount} likes</p>
		</div>
	{/each}
	{#if popularPosts.length === 0}
		<p class="text-sm text-gray-400">No posts for this tag.</p>
	{/if}
</div>
